import './App.css';

export function Lista({ nazwa, zaznaczone }) {
  return (
    <div class="check check check_gradient">
        <div class="id_nazwa">
          <h2 >{nazwa}</h2>
          </div>
          <div class="checkbox" >
         <input type='checkbox' checked="checked"></input>
        </div> 
      </div>
  );
}