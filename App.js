import {hairlineWidth} from 'nativewind';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';

const App = () => {
   // State to store list of users
  const [users, setUsers] = useState([]);

   // State to control visibility -> "Add New Student" modal
  const [modelStudent, setModelStudenet] = useState(false);

   // States to store data for a new student
  const [userId, setUserId] =useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  

  //Fetch student data from the API
  useEffect(() => {
    getListStudent();
  }, []);

  //Get Students details From the API
  const getListStudent = () => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        if (res) {
          setUsers(res);// Set the fetched users to state
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Delete Studenet Details from the  list
  const hadleRemove = item => {
    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'DELETE',
      body: JSON.stringify({
        id: item.id, //Send student_ID to delete the record
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        getListStudent();
      })
      .catch(err => {
        console.log(err);
      });
    Alert.alert('Deleted', `User ${item.name} has been deleted.`); // Show alert after delete
  };

  //Add New Studenet Details
  const handleCreate = () => {
    setModelStudenet(true);
  };

  //close screen without saving
  const handalClose = () => {
    setModelStudenet(false);
  };

  //Save New Student details to the API
  const handalSave = () => {
    if(userId == null){
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          phone: phone,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          getListStudent(); // Refresh student list after save
          setModelStudenet(false);
          clearForm();
        })
        .catch(err => {
          console.log(err);
        });
      Alert.alert('Saved', `New user has been added.`); // Show alert after save
      
    }
    else{
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'PUT',
        body: JSON.stringify({
          id: userId,
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          phone: phone,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          getListStudent(); // Refresh student list after edit
          setModelStudenet(false);
          clearForm();
        })
        .catch(err => {
          console.log(err);
        });
      Alert.alert('Saved', `Already user has been Edited.`); // Show alert after edit
      
    }
  };





  const clearForm = () => {
    setUserId(null)
    setFirstname("")
    setLastname("")
    setUsername("")
    setEmail("")
    setPhone("")
  }



  const hadleEdit = (item) => {
    setUserId(item.userId)
    setFirstname(item.firstname)
    setLastname(item.lastname)
    setUsername(item.username)
    setEmail(item.email)
    setPhone(item.phone)
    setModelStudenet(true)
   


  }





  

  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <Modal visible={modelStudent}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{paddingBottom: 50}}>
            {/* Header Title & Close Button */}
            <View className="flex-row justify-between p-4 ">
              <Text className="text-black text-[22px] font-bold">
                New Student
              </Text>

              <TouchableOpacity onPress={handalClose}>
                <Text className=" text-gray-600 text-[22px] font-bold ">
                  Close
                </Text>
              </TouchableOpacity>
            </View>

            {/* Details */}
            <View className="px-5 mt-5">
              <Text className="text-[20px] ml-4 mb-2">First Name</Text>
              <TextInput
                className="p-2 mx-6 mb-3 border-2 border-blue-700 rounded-lg"
                placeholder="Devinda"
                value={firstname}
                onChangeText={text => {
                  setFirstname(text);
                }}
              />

              <Text className="text-[20px] ml-4 mb-2">Last Name</Text>
              <TextInput
                className="p-2 mx-6 mb-3 border-2 border-blue-700 rounded-lg"
                placeholder="Wanasinghe"
                value={lastname}
                onChangeText={text => {
                  setLastname(text);
                }}
              />

              <Text className="text-[20px] ml-4 mb-2">User Name</Text>
              <TextInput
                className="p-2 mx-6 mb-3 border-2 border-blue-700 rounded-lg"
                placeholder="@example00"
                value={username}
                onChangeText={text => {
                  setUsername(text);
                }}
              />

              <Text className="text-[20px] ml-4 mb-2">Email</Text>
              <TextInput
                className="p-2 mx-6 mb-3 border-2 border-blue-700 rounded-lg"
                placeholder="example@gmail.com"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
              />

              <Text className="text-[20px] ml-4 mb-2">Phone Number</Text>
              <TextInput
                className="p-2 mx-6 mb-3 border-2 border-blue-700 rounded-lg"
                placeholder="+94774567XX"
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                }}
              />

              {/* New Studenet Add Save Button */}
              <TouchableOpacity
                onPress={handalSave}
                className="m-6 bg-black border-2 border-black">
                <Text className=" text-white text-[22px] font-bold text-center p-2">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Titile & Add Button */}
      <View className="flex-row justify-between">
        <Text className="pb-2 pl-2 mt-1 text-3xl text-left text-black ">
          Student List {users.length}
        </Text>
        <TouchableOpacity
          onPress={handleCreate}
          className="p-1 border-2 border-black border-solid rounded-2xl">
          <Text className="pl-2 pr-3 text-[22px]">Add New</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* student details */}
        {users.map(item => {
          return (
            <View
              key={item.id}
              className="flex-row justify-between p-4 my-2 border border-gray-300 rounded">
              <View className="">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-sm text-gray-600">{item.username}</Text>
                <Text className="text-sm text-gray-500">{item.email}</Text>
                <Text className="text-sm text-gray-500">{item.phone}</Text>
              </View>

              {/* Delete Function */}
              <View>
                <TouchableOpacity onPress={() => hadleRemove(item)}>
                  <Text className="text-red-600">Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => hadleEdit(item)}>
                  <Text className="pt-10 text-blue-600">Edit</Text>
                </TouchableOpacity>

              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
