export function SearchCheckComponent({label, value, onChange}) {

  return (
    <div>
      <label id="character-field">{label}</label>
      <input name="character-field" type="checkbox" value={value} onChange={onChange}/>
    </div>
  )
}