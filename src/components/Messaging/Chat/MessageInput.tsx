export const MessageInput = ({ value, onChange, onSubmit }: { onChange: any; value: string; onSubmit: () => void }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Nom :
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
      <input type="submit" value="Envoyer" />
    </form>
  );
};
