package es.juegosenred.backend.fightforthehood;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketTimeHandler extends TextWebSocketHandler {
	
	@Autowired
	private MyMatch mymatch;
	
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
		
		ParesDeUsuariosEnLaMismaPartida.clear();
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
	
	private void BorrarJugadoresEnPartida() {
		mymatch.getNombresenPartida().clear();
	}
	
	private void SelectordeTipodeMensaje(WebSocketSession session , JsonNode node) throws IOException {
		
		ObjectNode newNode = mapper.createObjectNode();
		switch(node.get("protocolo").asText()){		
			
		case "Tiempo":
			newNode.put("protocolo", node.get("protocolo").asText());
			newNode.set("tiempo", node.get("tiempo"));
			//sendOtherParticipants(session, newNode);
			sendHostToClient(session, newNode);
			break;
			
		case "Host":
			newNode.put("protocolo", node.get("protocolo").asText());
			List<WebSocketSession> participantes = ParesDeUsuariosEnLaMismaPartida.get(session.getId());
			System.out.println(participantes.size());
			if(participantes.get(0).equals(session)){
				newNode.put("ishost", session.getId());
			}else {
				newNode.set("ishost", null);
			}
			session.sendMessage(new TextMessage(newNode.toString()));
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

