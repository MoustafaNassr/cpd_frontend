import { EmptyComponent, ErrorComponent, Loading, showToast, TOAST_TYPES } from "@/utils";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function ActionPanel() {

  const { data: session } = useSession()

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  const getLogsData = () => {
    fetch(`/api/cpdForm?user_token=${session?.user.token}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong on getting your logs data');
        }
        return res.json()
      })
      .then((result) => {
        if (result.hasOwnProperty('success') && !result.success) {
          throw new Error('Something went wrong on getting your logs data')
        }
        setData(result.data);
        setLoading(false)
      }).catch((err) => {
        setLoading(false);
        setError(true)
        showToast(TOAST_TYPES.ERROR, err.message);
      })
  }

  useEffect(() => {
    getLogsData()
  }, [])

  return (
    <div className="bg-white shadow sm:rounded-lg mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 py-5 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loading size={8} />
          </div>
        ) : error ? (
          <ErrorComponent />
        ) : data?.length > 0 ?
          data?.map((card, index) => (
            <div key={card.id} className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <h4 className="sr-only">{card.format_of_training.name}</h4>
                <div className="sm:flex sm:items-start">
                  <div className="rounded-md bg-black/55 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm">
                    <h3 className="text-base font-semibold leading-6 text-white">{card.format_of_training.name}</h3>
                  </div>
                  <div className="mt-3 sm:ml-4 sm:mt-0">
                    <div className="text-sm font-medium text-gray-900">{card.hours_logged}</div>
                    <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                      <div>{card.date_completed}</div>
                      <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">&middot;</span>
                      {/* <div className="mt-1 sm:mt-0">{card.lastUpdated}</div> */}
                    </div>
                  </div>
                </div>
                {/* <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  {card.editButtonText}
                </button>
              </div> */}
              </div>
            </div>
          )) : (
            <EmptyComponent text={"You don't have any logs yet"} />
          )}
      </div>
    </div>
  );
}
