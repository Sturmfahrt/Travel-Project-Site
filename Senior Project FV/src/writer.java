import java.awt.List;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import com.opencsv.CSVWriter;

public class writer {
	public static void write(String popcorn) throws IOException { //writes stuff into a text file
		
		String FILENAME = "test\\cities.txt";
		
		BufferedWriter bw = null;
		FileWriter fw = null;
		fw = new FileWriter(FILENAME, true);
		bw = new BufferedWriter(fw);
		
		try {
			String content = popcorn;
			
			bw.write(content);
			bw.newLine();
			
			System.out.println("Done writing");
			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {

			try {

				if (bw != null)
					bw.close();

				if (fw != null)
					fw.close();

			} catch (IOException ex) {

				ex.printStackTrace();

			}
		}
	}
	
	public static void writeDataForCustomSeperatorCSV(String filePath) 
	{ 

		// first create file object for file placed at location 
		// specified by filepath 
		File file = new File(filePath); 

		try { 
			// create FileWriter object with file as parameter 
			FileWriter outputfile = new FileWriter(file); 

			// create CSVWriter with '|' as separator 
			CSVWriter writer = new CSVWriter(outputfile, '|', 
											CSVWriter.NO_QUOTE_CHARACTER, 
											CSVWriter.DEFAULT_ESCAPE_CHARACTER, 
											CSVWriter.DEFAULT_LINE_END); 

			// create a List which contains String array 
			ArrayList<String[]> data = new ArrayList<String[]>(); 
			data.add(new String[] { "Name", "Class", "Marks" }); 
			data.add(new String[] { "Aman", "10", "620" }); 
			data.add(new String[] { "Suraj", "10", "630" }); 
			writer.writeAll(data); 

			// closing writer connection 
			writer.close(); 
		} 
		catch (IOException e) { 
			// TODO Auto-generated catch block 
			e.printStackTrace(); 
		} 
	} 
 
}
