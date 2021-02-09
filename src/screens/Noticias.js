import * as React from "react";
import Header from "../components/Header";
import { View, Text, SafeAreaView } from "react-native";
import NoticiasCard from "../components/NoticiasCard";
import { ScrollView, TouchableNativeFeedback } from "react-native-gesture-handler";
import { getNews } from "../lib/shopify";

export default class Noticias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportItems: [],
    };
  }

  componentDidMount() {
    getNews().then((res) => {
      this.setState({ reportItems: res });
    });
  }

  render() { 
    let { navigation } = this.props;
    var { reportItems } = this.state;
    return ( 
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Header onPress={() => {navigation.navigate("Inicio")}}/>
        <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
          <ScrollView>
            {reportItems.slice(0).reverse().map((report) => {
              return (
                <TouchableNativeFeedback onPress={()=>{navigation.navigate('NoticiasLeer', {id: report._id, items: reportItems})}} key={report._id}>
                <NoticiasCard
                  key={report._id}
                  title={report.title}
                  description={report.description}
                  source={report.thumbnail}
                />
                </TouchableNativeFeedback>
              );
            })}
            
          </ScrollView>
          </View>
      </SafeAreaView> 
    );
  }
}