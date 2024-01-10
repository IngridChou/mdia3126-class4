import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios'

export default function Home({ navigation }) {

    const [data, setData] = useState();

    var apiKey = "fdd60ac6a0a2493396f8a4babb6870fe";
    var type = "tesla";
    var dateFrom = "2023-09-20";
    var dateTo = "2023-09-20";
    var sortBy = "publishedAt";
    var pageSize = 5;

    const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;

    const GrabNews = () => {
        axios.get(url)
            .then((response) => {
                //console.log(response);
                console.clear();
                setData(response.data)
                console.log(response.data);
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <View style={styles.container}>
            <Text>Welcome!</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to about page"
                onPress={() => navigation.push('About')}
            />
             <Button onClick={() => GrabNews()}>Grab Info</Button>
        {
          data && data.articles.map((d, index) => {
            return(
              <View key={index}>
                {d.urlToImage && <Image
                                  width={50}
                                  height={50}
                                  src={d.urlToImage}
                                  alt="Image"
                />}
                <View>{d.author}</View>
                <View>{d.title}</View>
              </View>
            )
          })
        }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
