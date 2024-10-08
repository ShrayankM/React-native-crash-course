import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import images from '../../constants/images'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { createUser } from '@/lib/appwrite'
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {

  const {setUser, setIsLoggedIn} = useGlobalContext();

  const [form, setForm] = useState ({
    userName: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitForm = async () => {

    if (form.userName === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please enter all details");
    }

    setIsSubmitting(true);

    try {

      const result = await createUser(form.email, form.password, form.userName);
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch(error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-6 my-6">
        <Image
            source={images.logo}
            className="w-[116px] h-[35px]"
            resizeMode="contain"
        />

        <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
          Sign up to Aora
        </Text> 

        <FormField 
            title="Username"
            value={form.userName}
            handleChangeText={(i: string) => setForm({ ...form, userName: i })}
            otherStyles="mt-10"
            placeholder={''}        />  

        <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(i: string) => setForm({ ...form, email: i })}
            otherStyles="mt-7"
            keyboardType="email-address" 
            placeholder={''}        />  

        <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(i: string) => setForm({ ...form, password: i })}
            otherStyles="mt-7"
            keyboardType={undefined} 
            placeholder={''}        />  

        <CustomButton 
          title="Sign-Up" 
          handlePress={submitForm}  
          containerStyles='mt-7' 
          isLoading={isSubmitting}   
        />  

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
          Have an account already ?
          </Text>
          <Link href="/sign-in" className="text-lg font-psemibold text-secondary">Sign-In</Link>
        </View>  
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp