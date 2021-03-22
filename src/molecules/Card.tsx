export default function Card(props: any) {

  return (
    <div id={props.id} className="card" onClick={props.onClick}>
      <span>{props.children}</span>
    </div>
  );
}