º
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ip")
public class ServerManager {
    
     //Puerto que  tiene el juego.
    
    private final static int port = 8080;
    
    @GetMapping
    private String getServerHostAddress() {
        return getAddress();
    }

    /**
     * String que contiene la IP a la que se puede conectar o la dirección de localhost si no se puede obtener.
     */
    public static String getAddress() {
        // Preparamos la dirección de localhost para devolverla en caso de errores
        String ret = "127.0.0.1";

        try {
            // Primero tenemos que buscar en todas las interfaces de red conectadas
            
            Enumeration<NetworkInterface> all = NetworkInterface.getNetworkInterfaces();
            // Cada interfaz de red tiene varias direcciones ip posibles
            while(all.hasMoreElements()) {
                
                
                Enumeration<InetAddress> addresses = all.nextElement().getInetAddresses();
                while(addresses.hasMoreElements()) {
                    InetAddress address = addresses.nextElement();

                    // Y algunas direcciones, de hecho, son direcciones locales que el dispositivo usa para referirse a sí mismo
                    
                    if(!address.isLoopbackAddress() && !address.isLinkLocalAddress()) {

                        //La podemos devolver si no se referencia a si mismo
                        ret = address.getServerHostAddress();
                    }
                }
                
            }

        } catch(SocketException e) {
            // getNetworkInterfaces() lanza una excepción:
            System.out.println("Se ha producido un error al obtener la IP del servidor (" + e.getMessage() + ").");
        }

        // Devuelve la dirección junto al puerto
        return ret + ":" + port;
    }
}