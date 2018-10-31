
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import java.io.BufferedWriter;
import java.io.FileWriter;

public abstract class Test {

	public static void main(String[] args) throws IOException {
		
		//cities(1);
		
		Document doc = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL0577:1:US").get(); //highest number for Florida is 1201
		System.out.println(doc.title()+":");
		Elements temp = doc.select(".temp span");
		Elements date = doc.select(".twc-sticky-col span");
		Elements precip = doc.select(".precip span span");
	
		
		String text = temp.text();
		String name = doc.title();
		String dative = date.text();
		String rain = precip.text();
		String[] fried = name.split(" ");
		String[] curry = text.split(" ");
		String[] rice = dative.split(" ");
		String[] soup = rain.split(" ");
		
		String area = fried[0]+ " "+fried[1];
		
		System.out.println(rain);
		
		int adder = 0;
		int saddler = 0;
		int padd = 0;
		System.out.println("The forecast for "+area+": ");
		try {
			for(int i = 0; curry.length > i; i++) {
				
				System.out.println("Temparature for "+rice[adder]+", "+rice[adder + 1]+" "+rice[adder + 2]+" is High: "+curry[saddler]+" / Low: "+curry[saddler + 2]+" and the chance of precipitation is "+soup[padd]);
				adder += 3;
				saddler += 3;
				padd += 2;
			}
		} catch(ArrayIndexOutOfBoundsException e) {
			
		} 

		System.out.println("Things work!");
	}
	
	public static void cities(int l) throws IOException {
		try {
		while(l != 1202) {
			Document docum = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL"+String.format("%04d", l)+":1:US").get();
			String citi = docum.title();
			String[] citiName = citi.split(",");
			String cities = citiName[0];
			System.out.println(cities + ": "+String.format("%04d", l));
			//writer(cities+": "+String.format("%04d", l));
			l++;
			
		}
		} catch (org.jsoup.HttpStatusException e) {
			l++;
			cities(l);
		}

	}
	
	public static void writer(String popcorn) throws IOException {
		
		String FILENAME = "test\\cities.txt";
		
		BufferedWriter bw = null;
		FileWriter fw = null;
		fw = new FileWriter(FILENAME, true);
		bw = new BufferedWriter(fw);
		
		try {
			String content = popcorn;
			
			bw.write(content);
			bw.newLine();
			
			System.out.println("Done");
			
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
}
