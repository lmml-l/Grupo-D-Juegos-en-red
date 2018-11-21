package es.juegosenred.backend.fightforthehood;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;


public class ReaderWriter {

    String [] apodosindex = new String[10];

    public ReaderWriter(String [] apodos){
        apodosindex = apodos;
    }
            

        public String[] init(String[] apodosindex){
            for(int i=0; i<10; i++){
                apodosindex[i]=null;
            }
            return apodosindex;
        }    

        public void resetArchive(File file){
            file.delete();
            file = new File("apodosindex.txt");
        }

        public String[] Lector(){
            String line;
            String text = "";
            String spacer = ",";
            try{

                FileReader fr = new FileReader("apodosindex.txt");
                BufferedReader br = new BufferedReader(fr);

                line = br.readLine();
                
                while (line != null){
                    
                    System.out.print(line);

                    text+=(line);

                    line = br.readLine();
                }

                
                br.close();


            }catch (IOException e){
                e.printStackTrace();
            }

            String[] apodossplit = text.split(spacer);
            String[] listapodos = new String[10];

               for(int i = 0; i < listapodos.length; i++){
                    listapodos[i] = apodossplit[i];
                }
            
            return listapodos;
        }

        public void Escritor(String[] apodosindex, MyInfo myinfo){
          
            File file = new File("apodosindex.txt");
            FileWriter fw;
            PrintWriter pw;
            
            try{
                
                fw = new FileWriter(file);
                pw = new PrintWriter(fw);
                for (int i = 0; i < 10; i++) {
                    if(apodosindex[i]==null){
                        apodosindex[i]= myinfo.getApodo();
                        pw.println(myinfo.getApodo() + ",");
                    }else if(apodosindex[9]!=null){
                        for(int j = 1; j < 9; j++){
                            apodosindex[j]=apodosindex[j+1];
                        }
                        apodosindex[9]=myinfo.getApodo();
                        resetArchive(file);

                        for(int k = 0; k < 10; k++){
                            pw.println(apodosindex[k] + ",");
                        } 
                    }
                }
                 pw.close();
            }
            catch (Exception e)
            {
                e.printStackTrace();

            }
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