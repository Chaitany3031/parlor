import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useBooking } from "../../../context/BookingContext";

const SelectedServiceList = () => {
  const { selectedServices, removeService } = useBooking();

  return (
    <div className="my-4 space-y-2.5 max-h-64 overflow-y-auto pr-1">
      {selectedServices.map((service) => (
        <div
          key={service.id}
          className="py-2.5 px-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex justify-between items-center gap-2"
        >
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-xs text-gray-800 dark:text-gray-200 truncate">
              {service.name}
            </h5>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
              <span>₹{service.price}</span>
              <span>•</span>
              <span>{service.duration}m</span>
            </div>
          </div>
          <IconButton
            size="small"
            onClick={() => removeService(service.id)}
            sx={{ color: "#ef4444" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default SelectedServiceList;
