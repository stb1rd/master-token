import DeleteIcon from '@mui/icons-material/Delete';
import set from 'lodash/set';

export const HistoryForm = ({ history, setHistory }) => {
  const historyParsed = JSON.parse(history || '[]');

  const handleHistoryEntryAdd = () => setHistory(JSON.stringify([...historyParsed, {}]));
  const handleHistoryEntryDelete = (i) => setHistory(JSON.stringify(historyParsed.filter((x, j) => i !== j)));
  const handleOnChange = (i, name, value) => {
    set(historyParsed, `${i}.${name}`, value);
    setHistory(JSON.stringify(historyParsed));
  };

  return (
    <>
      {historyParsed.map((historyItem, i) => (
        <div key={historyItem.content} className="flex flex-col">
          <div className="flex flex-row gap-2 items-baseline">
            <h2>History entry #{i + 1}</h2>
            <button className="btn btn-sm" onClick={() => handleHistoryEntryDelete(i)}>
              <DeleteIcon />
            </button>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={historyItem.date}
              onChange={(e) => handleOnChange(i, 'date', e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={historyItem.type}
              onChange={(e) => handleOnChange(i, 'type', e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Verified by</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={historyItem.verified_by}
              onChange={(e) => handleOnChange(i, 'verified_by', e.target.value)}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={historyItem.content}
              onChange={(e) => handleOnChange(i, 'content', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="btn max-w-xs" onClick={handleHistoryEntryAdd}>
        Add history entry
      </button>
    </>
  );
};
