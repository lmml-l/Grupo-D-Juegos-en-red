package es.juegosenred.backend.fightforthehood;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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
	private Map<String,List<WebSocketSession>> ParesDeUsuariosEnLaMismaPartida = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());
		sessions.put(session.getId(), session);
		AgruparSesionesDeDosEnDos(session);
	
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
		
		BorrarSesionesDeDosEnDos(session);	
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());
		
		SelectordeTipodeMensaje(session, node);
	}
	
	//La nueva sesion se genera cuando los usuarios llegan al CharacterSelectionOnline , asi que se agrupan dos usuarios que seran aquellos que vayan a jugar la partida
	private void AgruparSesionesDeDosEnDos(WebSocketSession session) {
		boolean IsContained= false;
		for(List<WebSocketSession> i: ParesDeUsuariosEnLaMismaPartida.values()){
			if(i.size()==1 && !IsContained) {
				i.add(session);
				ParesDeUsuariosEnLaMismaPartida.put(i.get(0).getId(), i);
				ParesDeUsuariosEnLaMismaPartida.put(i.get(1).getId(), i);
				IsContained=true;
				System.out.println(ParesDeUsuariosEnLaMismaPartida.get(i.get(0).getId()));
				System.out.println(ParesDeUsuariosEnLaMismaPartida.get(i.get(1).getId()));
			}	
		}
		
		if(!IsContained) {
			List<WebSocketSession> ListaConParDeUsuariosDeUnaNuevaPartida = new ArrayList<>();
			ListaConParDeUsuariosDeUnaNuevaPartida.add(session);
			ParesDeUsuariosEnLaMismaPartida.put(session.getId(), ListaConParDeUsuariosDeUnaNuevaPartida);
		}
	}
	
	private void BorrarSesionesDeDosEnDos(WebSocketSession session){
		boolean IsFound = false;
		for(List<WebSocketSession> i: ParesDeUsuariosEnLaMismaPartida.values()){
			if(i.contains(session)&&!IsFound){
				
				if(i.size()>=1) {
				ArrayList<WebSocketSession> PrimerCaso = new ArrayList<>();
				PrimerCaso.add(i.get(0));
				ParesDeUsuariosEnLaMismaPartida.put(i.get(0).getId(),PrimerCaso);//Se genera y guarda la sesion en caso de que la sesion eliminada sea la segunda
				}
				if(i.size()>=2) {
				ArrayList<WebSocketSession> SegundoCaso = new ArrayList<>();
				SegundoCaso.add(i.get(1));
				ParesDeUsuariosEnLaMismaPartida.put(i.get(1).getId(),SegundoCaso);//Se genera y guarda la sesion en caso de que la sesion eliminada sea la primera
				}
				
				ParesDeUsuariosEnLaMismaPartida.remove(session.getId());//Se borra del mapa la lista con la sesion eliminada.
				
				IsFound=true;
				
			}
		}
		
	}
	
	private void sendOtherParticipants(WebSocketSession session, Object newNode) throws IOException {

		System.out.println("Message sent: " + newNode.toString());
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}
	
	private void sendParticipantsInSameMatch(WebSocketSession session, Object newNode) throws IOException {

		System.out.println("Message sent: " + newNode.toString());
		List<WebSocketSession> participantes = ParesDeUsuariosEnLaMismaPartida.get(session.getId());
			for(WebSocketSession participant : participantes){
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
		}	
	}
	
	private void sendHostToClient(WebSocketSession session, Object newNode) throws IOException {

		System.out.println("Message sent: " + newNode.toString());
		List<WebSocketSession> participantes = ParesDeUsuariosEnLaMismaPartida.get(session.getId());
			if(participantes.get(0).equals(session)) {
				for(WebSocketSession participant : participantes){
				if(!participant.getId().equals(session.getId())) {
					participant.sendMessage(new TextMessage(newNode.toString()));
				}
			}	
			}
	}
	
	private void SelectordeTipodeMensaje(WebSocketSession session , JsonNode node) throws IOException {
		
		ObjectNode newNode = mapper.createObjectNode();
		switch(node.get("protocolo").asText()){		
		case "Jugador":
			newNode.put("protocolo",node.get("protocolo").asText());
			newNode.set("jugador",node.get("jugador"));			
			//sendOtherParticipants(session, newNode);
			sendParticipantsInSameMatch(session, newNode);
			break;
			
		case "GetReady":
			newNode.put("protocolo", node.get("protocolo").asText());
			newNode.put("ready", node.get("ready").get("ready").asText());
			//sendOtherParticipants(session, newNode);
			sendParticipantsInSameMatch(session, newNode);
			break;
			
		case "Drops":
			newNode.put("protocolo", node.get("protocolo").asText());
			newNode.set("drops", node.get("drops"));
			//sendOtherParticipants(session, newNode);
			sendHostToClient(session, newNode);
			break;
		case "Skin":
		    newNode.put("protocolo", node.get("protocolo").asText());
		    newNode.set("skin", node.get("skin"));
			//sendOtherParticipants(session, newNode);
			sendParticipantsInSameMatch(session, newNode);
			break;
		default:
			
		}	
				
		}
}

