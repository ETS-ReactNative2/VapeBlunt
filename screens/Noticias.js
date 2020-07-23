import * as React from "react";
import Header from "../components/Header";
import { View, Text, SafeAreaView } from "react-native";
import NoticiasCard from "../components/NoticiasCard";
import { ScrollView } from "react-native-gesture-handler";
import { loadNewsCollection } from "../lib/mongodb-server";

export default class Noticias extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportItems: [],
    };
  }

  componentDidMount() {
    loadNewsCollection().then((res) => {
      this.setState({ reportItems: res });
    });
  }

  render() { 
    let { navigation } = this.props;
    var { reportItems } = this.state;
    console.log(reportItems)
    return ( 
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <Header
          onPress={() => {
            navigation.navigate("Inicio");
          }}
        />
        <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
          <ScrollView>
            {reportItems.map((report) => {
              return (
                <NoticiasCard
                  key={report._id}
                  title={report.title}
                  description={report.description}
                  source={report.thumbnail}
                />
              );
            })}
            
          </ScrollView>
          </View>
      </SafeAreaView> 
    );
  }
}