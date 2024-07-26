import React from "react";
import { useSelector } from "react-redux";
import { symbolAmount } from "../../../../utils/Helper";
import TrackOrderTimeline from "./TrackOrderTimeline";

function TrackOrderHead() {
  const trackOrderdata = useSelector(
    (state) => state.OrderReducerData.trackOrderData
  );

  const orderHeadData = trackOrderdata?.order_head_data?.head;

  const latestStatus =
    trackOrderdata?.order_history?.[trackOrderdata?.order_history.length - 1]
      ?.order_status_id || "pending";

  function formatDate(created_at) {
    if (!created_at) return null;
    const date = new Date(created_at);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  }

  return (
    <>
      <div className="order-number">
        <div className="mb-0">
          <span>
            {trackOrderdata && orderHeadData?.order_serial_no !== undefined
              ? orderHeadData?.order_serial_no
              : null}
          </span>
          <div className="mb-0 d-xl-flex gap-2">
            <span className="product-count">
              {trackOrderdata && orderHeadData?.num_of_products !== undefined
                ? `${orderHeadData.num_of_products} Product .`
                : null}
            </span>
            <span className="date">
              {trackOrderdata && orderHeadData?.created_at !== undefined
                ? "Order Placed in " + formatDate(orderHeadData?.created_at)
                : null}
            </span>
          </div>
        </div>
        <span className="total-count">
          {trackOrderdata && orderHeadData?.net_total !== undefined
            ? symbolAmount(
                orderHeadData?.net_total,
                orderHeadData?.currency_iso_code
              )
            : null}
        </span>
      </div>

      <div className="order-processing mt-4">
        {trackOrderdata && <TrackOrderTimeline status={latestStatus} />}
      </div>
    </>
  );
}

export default TrackOrderHead;
