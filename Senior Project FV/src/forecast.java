import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class forecast {
	public static void weather() throws IOException {

		Document doc = Jsoup.connect("https://weather.com/weather/tenday/l/Davie+FL+USFL0316:1:US").get(); //highest number for Florida is 1201
		//connects to the web page
		
		Elements temp = doc.select(".temp span");
		Elements date = doc.select(".twc-sticky-col span");
		Elements precip = doc.select(".precip span span");
		//gets certain parts of the document and assigns them to elements
	
		
		String text = temp.text();
		String name = doc.title();
		String dative = date.text();
		String rain = precip.text();
		String[] fried = name.split(" ");
		String[] curry = text.split(" ");
		String[] rice = dative.split(" ");
		String[] soup = rain.split(" ");
		//all of this changes the info it gathers to a string and then that string into an array
		
		String area = fried[0]+ " "+fried[1];
		//just creates the name of the area you searched into a string
		
		int adder = 0;
		int saddler = 0;
		int padd = 0;
		//initializing the integers
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

		//System.out.println("Things work!");
	}
}
