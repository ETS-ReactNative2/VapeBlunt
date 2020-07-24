import * as React from 'react';
import { ScrollView, Text, SafeAreaView, ImageBackground, Dimensions, StyleSheet, View, Image} from 'react-native';
import Header from '../components/Header';
import BlackButton from '../mini_components/BlackButton'
import NavigationButton from '../mini_components/NavigationButton';
import DynamicImage from '../components/DynamicImage';

const colors = require('../assets/colors');
const win_width = Dimensions.get('window').width;

export default class BlogLeer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            author: '',
            description: '',
            title: '',
            elements: []
        }
    }
    
    componentDidMount(){
        let {id} = this.props.route.params
        let {items} = this.props.route.params
        items.forEach(i => {
            if(i._id == id){
                this.setState({author: i.author, description: i.description, title: i.title, elements: i.elements})
                console.log(i.elements)
            }
        });
    }

    render(){
        let { navigation } = this.props;
        var {author, description, title, elements} = this.state;
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <Header onPress={() => { navigation.navigate("Blog")}} arrow  />
                <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
                    <View style={{ marginBottom: '10%'}}>
                            <Text style={{fontWeight:"bold",fontSize:20,marginTop:20}}>{title} </Text>
                            <Text style={{ color:'grey',opacity:.9 }}>Por {author} </Text>
                    </View>
                    <View>
                      {elements.map((i) =>{
                          if(i.type == 'paragraph'){
                              return(
                                <Text key={i.id}>{i.content}</Text>
                              );
                          }else if(i.type == 'image'){
                              return(
                                <Image key={i.id} source={{uri:i.content}} 
                                  style={{marginBottom: 10, aspectRatio:3/2, resizeMode:'contain'}}/>
                              );
                          }else if(i.type == 'header'){
                              return(
                                <Text key={i.id} style={{textAlign: 'center',fontWeight:"bold",fontSize:20, marginBottom:10}} >{i.content}</Text>
                              );
                          }
                      })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}