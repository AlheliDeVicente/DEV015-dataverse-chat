import { data } from "../data/dataset.js";
export const chat = (props) => {
  const chatComponent = document.createElement("div");
  chatComponent.setAttribute("class", "chatContainer");
  const selectedPhilosoper = data.find(philosopher => philosopher.id === props.id)
  chatComponent.innerHTML = `
            <div class="chat-header">
                <img src="${selectedPhilosoper.imageUrl}" alt="Contact Picture">
                <h3>Contacto 1</h3>
                <p>En línea</p>
            </div>
            <div class="chat-messages">
                <!-- Mensajes -->
                <div class="message received">
                    <p>Mensaje recibido</p>
                </div>
                <div class="message sent">
                    <p>Mensaje enviado</p>
                </div>
                <!-- Más mensajes -->
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Escribe un mensaje...">
                <button>Enviar</button>
            </div>`;
  return chatComponent;
};
