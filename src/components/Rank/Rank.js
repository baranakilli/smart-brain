import { useEffect, useState } from "react";

const Rank = ({ name, entries }) => {
  const [emoji, setEmoji] = useState('');
  useEffect(() => {
    generateEmoji(entries);
    // eslint-disable-next-line
  }, [entries])

  const generateEmoji = (entries) => {
    fetch(`https://b91pjqw9oj.execute-api.eu-north-1.amazonaws.com/rank?rank=${entries}`)
      .then(resp => resp.json())
      .then(data => setEmoji(data.input))
      .catch(console.log);
  }

  return (
    <div>
      <div className="white f3">{`Welcome ${name}, your entry count is...`}</div>
      <div className="white f1">{entries}</div>
      <div className="white f3">Rank Badge: {emoji}</div>
    </div>
  );
};

export default Rank;
