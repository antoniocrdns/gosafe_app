import React from "react";
import { View, Text, Button } from "react-native";

const ScanearQR = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title="Scanear"
                onPress={() => navigation.navigate('PerfilChofer')}
            />
        </View>
    );
}

export default ScanearQR;
