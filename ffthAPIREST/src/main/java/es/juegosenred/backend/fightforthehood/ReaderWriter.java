package es.juegosenred.backend.fightforthehood;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


public class ReaderWriter {

    String [] apodosindex = new String[5];

    public ReaderWriter(String [] apodos){
        apodosindex = apodos;
    }   

        public void resetArchive(File file){
            file.delete();
            file = new File("apodosindex.txt");
        }

        public String[] Lector(String[] apodosindex){
            String line;
            String [] apodosarchive = new String[5];
            int i = 0;
            try{

                FileReader fr = new FileReader("apodosindex.txt");
                BufferedReader br = new BufferedReader(fr);

                line = br.readLine();
                apodosarchive[i] = line;
                while (line != null){
                    
                    System.out.println(line);
                    apodosarchive[i] = line;
                    line = br.readLine();
                }

                
                br.close();


            }catch (IOException e){
                e.printStackTrace();
            }

            apodosindex = apodosarchive;
            return apodosindex;
        }

        public static ArrayList<String> Escritor(ArrayList<String> historial){
          
            File file = new File("apodosindex.txt");
            FileWriter fw;
            //PrintWriter pw;
            
            try{
                
                fw = new FileWriter(file);
                //pw = new PrintWriter(fw);
                int i = 0;
                while (i < 5 && i<historial.size()) {
                	if(historial.get(historial.size() - (i+1)) != null) {
                		fw.write(historial.get(historial.size() - (i+1))+"\n");
                	}
                	i++;
                }
                fw.close();
                //pw.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();

            }
            
            return historial;
            /*finally
            {
               try {
           
                   if (null != fw)
                      fw.close();
               }catch (Exception e2) {
                      e2.printStackTrace();
               }

            }*/
        }
    
}