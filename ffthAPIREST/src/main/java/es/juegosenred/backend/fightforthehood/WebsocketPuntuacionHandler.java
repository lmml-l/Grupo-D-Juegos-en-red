

package es.juegosenred.backend.fightforthehood;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketPuntuacionHandler extends TextWebSocketHandler {
	
	@Autowired
	private MyMatch mymatch;
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private BlockingQueue<WebSocketSession> ParesDeUsuariosEnLaMismaPartida = new ArrayBlockingQueue<WebSocketSession>(2);
	private ObjectMapper mapper = new ObjectMapper();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		ParesDeUsuariosEnLaMismaPartida.add(session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		
		ParesDeUsuariosEnLaMismaPartida.clear();
		sessions.clear();
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonNode node = mapper.readTree(message.getPayload());
		
		SelectordeTipodeMensaje(session, node);
	}
		
	private void sendHostToClient(WebSocketSession session, Object newNode) throws IOException {
		if(ParesDeUsuariosEnLaMismaPartida.peek().equals(session)) {
			for(WebSocketSession participant : ParesDeUsuariosEnLaMismaPartida){
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}	
		}
	}
	
	private void sendParticipantsInSameMatch(WebSocketSession session, Object newNode) throws IOException {
		for(WebSocketSession participant : ParesDeUsuariosEnLaMismaPartida){
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}	
	}
	
	private void BorrarJugadoresEnPartida() {
		mymatch.getNombresenPartida().clear();
	}
	
	private void SelectordeTipodeMensaje(WebSocketSession session , JsonNode node) throws IOException {
		
		ObjectNode newNode = mapper.createObjectNode();
		switch(node.get("protocolo").asText()){		
			
		case "Puntuacion":
			newNode.put("protocolo", node.get("protocolo").asText());
			newNode.set("puntuacion", node.get("puntuacion"));
			sendHostToClient(session, newNode);
			break;
			
		case "RESTART SALA":
			System.out.println("Reseteo sala porq puedo");
			newNode.put("protocolo", node.get("protocolo").asText());
			sendParticipantsInSameMatch(session, newNode);
			BorrarJugadoresEnPartida();
			ParesDeUsuariosEnLaMismaPartida.clear();
			sessions.clear();
			break;
			
		case "VACIAR SESIONES":
			BorrarJugadoresEnPartida();
			ParesDeUsuariosEnLaMismaPartida.clear();
			sessions.clear();
			break;	
		default:
			
		}	
				
		}
}