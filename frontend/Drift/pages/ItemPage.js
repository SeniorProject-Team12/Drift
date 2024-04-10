import React, { useEffect, useState} from "react";
import { Alert, View, FlatList, Text, Image, Pressable } from "react-native";
import { Button, Card, Portal, Dialog, Checkbox, List} from "react-native-paper";
import { useCart } from "../components/CartContext"
import axios from 'axios';
import configs from "../config";
import FolderList from "../components/FolderList"
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
const userID = 1;

const ItemPage = ({route}) => {
  const [folders, setFolders] = React.useState([]);
  const [isSaved, setIsSaved] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [checkedFolders, setCheckedFolders] = useState({});


  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

    const { item } = route.params;
    const { dispatch } = useCart();
    const toggleCheckBox = (savedFolderID) => {
      setCheckedFolders((currentItems) => ({
        ...currentItems,
        [savedFolderID]: !currentItems[savedFolderID],
      }));
    };

    const fetchSavedFolders = async () => {
      try {
          console.log("fetchingSavedFolders")
          const response = await fetch(configs[0].API_URL +`/savedFolders/getSavedFolders/userID/${userID}`);
          if (!response.ok) throw new Error('Network response was not ok.');
          const data = await response.json();
          setFolders(data);
      } catch (error) {
          console.error('There was an error fetching the saved folders:', error);
      }
    }

    const handleAddToCart = () => {
      dispatch({ type: 'ADD_TO_CART', item });
    };

    const fetchIsSaved =  async () => {
      try {
          const response = await axios.get(configs[0].API_URL +`/savedItems/isSaved/userID/${userID}/itemID/${item.itemID}`);
          setIsSaved(response.data[0][0].ItemExists)
      } catch (error) {
          console.error('Error:', error);
      }
    };

    useEffect(() => {
    }, [isSaved]);

    const toggleSaveBtn = () => {
      if (isSaved) {
        //#unsave item
        setIsSaved(0)
      } else {
        showDialog()
        //saveItem(folderName, userID)
        setIsSaved(1)
      }
    }
  
  useEffect(() => {
    console.log("useEffect fetchSavedFolders")
    fetchIsSaved();
    // fetchSavedFolders();
}, []);

// useEffect(() => {
//   console.log("folderlist folders: ", folders)
// }, [folders]);  

    const handleReport = async () => {
      console.log('item report button pressed!');
      try {
        Alert.alert("Report Item Post","Are you sure you want to report this post?", [
          {
              text: 'YES', onPress: async () => {
              try{
                const response = await axios.post(configs[0].API_URL + '/items/report/id/' + item.itemID); 
                  alert("This post has just been reported and will be reviewed by admin!");
              } catch(e) {
                  console.error('Error reporting posted item:', e);
              }
          }},
          {
            text: 'NO',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
        ]);
      } catch (error) {
        console.log(configs[0].API_URL + '/report/id/' + item.itemID);
        console.error('Error reporting posted item:', error);
      }
    }
    
    console.log(item)
    return (
      <View>
        {/* <Text>Item Page</Text> */}
      <Card style={{ borderRadius: 15 }} elevation={0}>
        <Image
            source={{
              uri: item.photoURL
            }}
            style={{ width: "100%", height: 300 }}
            resizeMode="cover"
          />

        <Card.Title title={item.brand + ' - '+ item.category} subtitle={item.sellerId} />

        <Card.Content
          style={{ height: "25%", flexDirection: "column", gap: "5px" }}
        >

        <Text>{item.price} USD</Text>
        <Text>{item.description}</Text>

        </Card.Content>

        <Card.Actions style={{flexDirection: 'row'}}>
          <Button
            style={{ backgroundColor: 'white' }}
            textColor = 'black'
          >
            More from owner
          </Button>

          <Button
            style={{ backgroundColor: isSaved ? 'yellow' : 'white' }}
            textColor='black' 
            onPress={()=>toggleSaveBtn()}
          >
            {isSaved ? 'Saved' : 'Save'} 
          </Button>

         
          <Button
            textColor="white"
            onPress={handleAddToCart}
          >
            Add to cart
          </Button>
    
        </Card.Actions>

        {/* <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Folders</Dialog.Title>
                    <SectionedMultiSelect
                      items={folders}
                      IconRenderer={Icon}
                      uniqueKey="savedFolderID"
                      onSelectedItemsChange={setCheckedFolders}
                      checkedFolders={checkedFolders}
                    />
                    <Dialog.Actions>
                    <Button onPress={hideDialog()}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
        </Portal> */}
        <Card.Actions style={{width: '50%', marginLeft: 82, marginTop: 25}}>
          <Button
              style={{ backgroundColor: 'red' }}
              textColor="black"
              onPress={() => handleReport()}
            >
              Report Posting
            </Button>
        </Card.Actions>
      </Card>

    </View>
  );
};

export default ItemPage;
