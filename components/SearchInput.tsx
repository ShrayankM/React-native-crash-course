import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import icons from '../constants/icons'

interface FormFieldProps {
    title: string;
    value: string;
    placeholder: string;
    handleChangeText: (input: string) => void;
    otherStyles?: string;
    keyboardType?: string;
}

const SearchInput: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props}) => {

  const [showPassword, setShowPassword] = useState(false);  

  return (

      <View className='border-2 border-black-200 w-full h-16 px-4 bg-gray-100 rounded-2xl focus:border-secondary items-center flex-row
      space-x-4'>
        <TextInput 
        className='flex-1 text-black font-psemibold text-base mt-0.5'
            value={value}
            placeholder={placeholder}
            placeholderTextColor='#7b7b8b'
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

        <TouchableOpacity>
            <Image 
                source={icons.search}
                className='w-5 h-5'
                resizeMode='contain'
            />
        </TouchableOpacity>

        {title === 'Password' && 
        <TouchableOpacity onPress={() => 
            setShowPassword(!showPassword)
        }>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
        </TouchableOpacity>}
      </View>
  )
}

export default SearchInput