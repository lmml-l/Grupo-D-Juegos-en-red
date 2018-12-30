package es.juegosenred.backend.fightforthehood;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		SelectordeTipodeMensaje(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, Object newNode) throws IOException {

		System.out.println("Message sent: " + newNode.toString());
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
			
		}
	}
	
	private void SelectordeTipodeMensaje(WebSocketSession session , JsonNode node) throws IOException {
		/*
		if(node.has("avatar") && node.has("arma") && node.has("escudo") //SE AÑADEN ELSE IF PARA CADA TIPO DE JSON (Jugador,drops...)
		&& node.has("vida") && node.has("proyectiles") && node.has("municiones") ) {//Se identifican diciendo si el nodo json tiene los atributos que deberia tener
		*/
		ObjectNode newNode = mapper.createObjectNode();
		switch(node.get("protocolo").asText()){		
		case "Jugador":
			newNode.put("protocolo",node.get("protocolo").asText());
			newNode.set("jugador",node.get("jugador"));
			
			sendOtherParticipants(session, newNode);
			break;
			
		case "GetReady":
			newNode.put("protocolo", node.get("protocolo").asText());
			newNode.put("ready", node.get("ready").get("ready").asText());
			sendOtherParticipants(session, newNode);
			break;
			
		default:
			
		}	
				
		}
}

