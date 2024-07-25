import { parseISO, formatDistanceToNow } from "date-fns";

const TimeAgo = ({ date }) => {
  const postDate = parseISO(date);
  const timePeriod = formatDistanceToNow(postDate);

  return (
    <div className="justify-content-end">
      <span title={date} className="postCredit">
        &nbsp; &nbsp; posted : <em> {timePeriod} </em> ago
      </span>
    </div>
  );
};

export default TimeAgo;
