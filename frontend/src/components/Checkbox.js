const Checkbox = ({ id, label, value, onChange }) => {
    return (
      <div>
        <input 
          id={id} 
          type="checkbox" 
          checked={value} 
          onChange={onChange} 
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };
  
  export default Checkbox;