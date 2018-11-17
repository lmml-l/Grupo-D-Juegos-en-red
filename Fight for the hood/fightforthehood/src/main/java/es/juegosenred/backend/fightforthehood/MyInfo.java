package es.juegosenred.backend.fightforthehood;

import javax.servlet.http.HttpServletRequest;

public class MyInfo {
	
	private String id;
	private String key;
	
	public MyInfo() {
		
	}
	
	public MyInfo(String id, String key) {
		this.id = id;
		this.key = key;
	}

	public String getId() {
		return id;
	}
	
	public void setId (String id, HttpServletRequest request) {
		this.id = request.getRemoteAddr();	
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}
	
	
	
}
