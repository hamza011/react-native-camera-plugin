import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Option',
    // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: '',
            imageUri: ''
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.header}>Image Picker Testing!</Text>
                {/* <Button title="Show options.." onPress={this.showImagePicker.bind(this)} /> */}
                <TouchableOpacity onPress={this.showImagePicker.bind(this)} style={styles.touchableOpacity}>
                    <Text style={[styles.boldFont, styles.colorBlack]}> Menu </Text>
                </TouchableOpacity>
                <View style={styles.view}>
                    {this.state.imageUri != '' ?
                        <View>
                            <Text>Image:</Text>
                            <Image source={this.state.imageUri} style={[styles.imageResolution, styles.imageBorder]} />
                        </View> :
                        <Text>No Image Available Yet.</Text>}
                </View>
            </View>
        );
    }

    showImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                const imageUri = { uri: 'data:image/jpeg;base64,' + response.data };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                    imageUri: imageUri
                });
                console.log("state: ", this.state);
            }
        });
    }
}

const styles = StyleSheet.create({
    imageResolution: {
        marginTop: 15,
        height: '100%',
        width: '100%',
        paddingRight: 20,
        paddingLeft: 20,
    },
    header: {
        width: '100%',
        padding: 20,
        backgroundColor: "#001f3f",
        fontSize: 20,
        color: '#ffffff'
    },
    touchableOpacity: {
        backgroundColor: '#01FF70',
        paddingTop: 8,
        paddingRight: 20,
        paddingBottom: 8,
        paddingLeft: 20,
    },
    boldFont: {
        fontWeight: 'bold'
    },
    colorBlack: {
        color: '#000000'
    },
    view: {
        height: 250,
        width: '100%',
        padding: 20
    },
    imageBorder: {
        borderWidth: 5,
        borderColor: '#d6d7da'
    }
});