
import java.io.IOException;

import org.jsoup.HttpStatusException;
import org.jsoup.Jsoup;
import org.jsoup.helper.Validate;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public abstract class Test {

	public static void main(String[] args) throws IOException {
		
		cities(1);
		
		Document doc = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL0577:1:US").get(); //highest number for Florida is 1201
		System.out.println(doc.title()+":");
		Elements temp = doc.select(".temp span");
		Elements date = doc.select(".twc-sticky-col span");
	
		
		String text = temp.text();
		String name = doc.title();
		String dative = date.text();
		String[] fried = name.split(" ");
		String[] curry = text.split(" ");
		String[] rice = dative.split(" ");
		
		String area = fried[0]+ " "+fried[1];
		
		int adder = 0;
		int saddler = 0;
		System.out.println("The forecast for "+area+": ");
		try {
			for(int i = 0; curry.length > i; i++) {
				
				System.out.println("Temparature for "+rice[adder]+", "+rice[adder + 1]+" "+rice[adder + 2]+" is High: "+curry[saddler]+" / Low: "+curry[saddler + 2]);
				adder += 3;
				saddler += 3;
			}
		} catch(ArrayIndexOutOfBoundsException e) {
			
		} 

		System.out.println("Things work!");
	}
	
	public static void cool() throws IOException {
		Document docu = Jsoup.connect("https://rpcs3.net").get();
		System.out.println(docu.title()+":");
	}
	
	public static void cities(int l) throws IOException {
		try {
		while(l != 1202) {
			Document docum = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL"+String.format("%04d", l)+":1:US").get();
			String citi = docum.title();
			String[] citiName = citi.split(",");
			String cities = citiName[0];
			System.out.println(cities + ": "+l);
			l++;
			
		}
		} catch (org.jsoup.HttpStatusException e) {
			l++;
			cities(l);
		}

	}

}
