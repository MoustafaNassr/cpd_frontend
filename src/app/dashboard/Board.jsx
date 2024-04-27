"use client"
import React, { useEffect, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { ErrorComponent, Loading, showToast, TOAST_TYPES } from "@/utils";

export const KanbanBoard = () => {

  // Hooks------------------------------------
  const { data: session } = useSession();
  // States-----------------------------------
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [cards, setCards] = useState([]);

  // Functions-----------------------------------------
  const getCardsData = () => {
    fetch(`/api/cpdPlan?user_token=${session?.user.token}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong on getting your CPD plan')
        }
        return res.json()
      })
      .then((result) => {
        if (result.hasOwnProperty('success') && !result.success) {  // This check as the request may done successfully but No data because of invalid token or other something else 
          throw new Error('Something went wrong on getting your CPD plan')
        }
        setCards([...result]);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(true);
        showToast(TOAST_TYPES.ERROR, err.message)
      })
  }

  useEffect(() => {
    getCardsData()
  }, [])
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loading size={8} />
        </div>
      ) : error ? (
        <ErrorComponent />
      ) : (
        <Board setLoading={setLoading} setError={setError} setCards={setCards} cards={cards} />
      )}
    </div>
  );
};

const Board = ({ cards, setCards }) => {

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12">
      <Column
        title="Backlog"
        status="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        status="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        status="in_progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        status="complete"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

const Column = ({ title, headingColor, cards, status, setCards }) => {

  const { data: session } = useSession()

  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = Number(e.dataTransfer.getData("cardId"));

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators)
    const before = element.dataset.before || Number("-1");

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, status };


      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === Number("-1");

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id == before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      const body = {
        cpd_plan_id: cardId,
        cpd_plan_status: element?.dataset.status
      }

      fetch(`/api/cpdPlan?user_token=${session?.user.token}`, {
        method: "PUT",
        body: JSON.stringify(body)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Something went wrong on changing the status of this CPD plan');
          }
          return res.json()
        })
        .then((result) => {
          if (result.hasOwnProperty('success') && !result.success) {  // This check as the request may done successfully but No data because of invalid token or other something else 
            throw new Error('Something went wrong on changing the status of this CPD plan')
          }
          console.log("result", result);
          setCards([...copy]);
        }).catch((err) => {
          showToast(TOAST_TYPES.ERROR, err.message);
        })

    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-status=${status}]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.status === status);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
          }`}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} status={status} />
        {status === 'backlog' && <AddCard status={status} setCards={setCards} />}
      </div>
    </div>
  );
};

const Card = ({ title, id, status, handleDragStart }) => {
  return (
    <>
      <DropIndicator beforeId={id} status={status} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, status })}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ beforeId, status }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-status={status}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }) => {

  const { data: session } = useSession();

  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = Number(e.dataTransfer.getData("cardId"));

    const body = {
      cpd_plan_id: cardId
    }

    fetch(`/api/cpdPlan?user_token=${session?.user.token}`, {
      method: "DELETE",
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong on deleting this CPD plan');
        }
        return res.json()
      })
      .then((result) => {
        if (result.hasOwnProperty('success') && !result.success) {  // This check as the request may done successfully but No data because of invalid token or other something else 
          throw new Error('Something went wrong on deleting this CPD plan')
        }
        setCards((pv) => pv.filter((c) => c.id !== cardId));
      }).catch((err) => {
        showToast(TOAST_TYPES.ERROR, err.message);
      })
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${active
        ? "border-red-800 bg-red-800/20 text-red-500"
        : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
        }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

const AddCard = ({ status, setCards }) => {
  const { data: session } = useSession()


  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      cpd_plan_title: text.trim(),
    };

    fetch(`/api/cpdPlan?user_token=${session?.user.token}`, {
      method: "POST",
      body: JSON.stringify(newCard)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong on adding your CPD plan');
        }
        return res.json()
      })
      .then((result) => {
        if (result.hasOwnProperty('success') && !result.success) {  // This check as the request may done successfully but No data because of invalid token or other something else 
          throw new Error('Something went wrong on adding your CPD plan')
        }
        setCards((pv) => [...pv, result]);
        setAdding(false);
      }).catch((err) => {
        showToast(TOAST_TYPES.ERROR, err.message);
      })
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};



export default KanbanBoard