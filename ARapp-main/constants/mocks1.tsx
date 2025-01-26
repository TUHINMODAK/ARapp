import { ReactNode } from 'react';
import {createContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Items {
  id: string;
  name: string;
  count: number;
  image: any;
}

interface FurnitureVariant {
  name: string;
  image: any; // Use a specific type like ImageSourcePropType for React Native images
  color: string;
  price: number;
  dimensions: string; // Furniture dimensions
  roomType: string;   // Suggested room type (e.g., "Living Room")
  furnitureType: string; // Category of furniture (e.g., "Sofa")
}

interface Mocks1ContextType {
  items: any[];
  furnitures: { [key: string]: Items[] };
  sofaDetails: { [key: string]: FurnitureVariant[] };
}

export const Mocks1 = createContext<Mocks1ContextType>({
  items: [],
  furnitures: {},
  sofaDetails: {}
});

  interface CountProviderProps {
    children: ReactNode;
  }

  export const Mocks1Provider = ({ children }: CountProviderProps) => {
  const [items, setItem] = useState<any[]>([]);
  const [furnitures, setFurnitures] = useState<{ [key: string]: Items[] }>({});
  const [sofaDetails, setSofaDetails] = useState<{ [key: string]: FurnitureVariant[] }>({});

  useEffect(() => {
    const getdata = async () => {

      await axios.get('http://192.168.1.2:5000/items') // Replace with your backend's IP/URL
        .then((response) => {
          const datas = response.data;
          datas.forEach((element: { name: any; }) => {
            setItem(prevItems => [...prevItems, element.name]); // Spread operator to add all hobbies
          });
          setFurnitures(prevFurnitures => {
            const updatedFurnitures = { ...prevFurnitures };
            items.forEach((category) => {
              updatedFurnitures[category] = [];
            });
            return updatedFurnitures;
          });
        })
        .catch((error) => {
          console.error('Error fetching data (items):', error);
        });

      await axios.get('http://192.168.1.2:5000/furnitures') // Replace with your backend's IP/URL
        .then((response) => {
          const datas = response.data;
          datas.forEach((element: { type: string | number; id: any; name: any; count: any; image: any; }) => {
            setFurnitures(prevFurnitures => {
              const updatedFurnitures = { ...prevFurnitures };
              if (!updatedFurnitures[element.type]) {
                updatedFurnitures[element.type] = [];
              }
              updatedFurnitures[element.type].push({ id: element.id, name: element.name, count: element.count, image: { uri: `https://github.com/TUHINMODAK/ARapp/blob/main/ARapp-main/assets/images/${element.image}?raw=true` } });
              return updatedFurnitures;
            });
          });
          Object.keys(furnitures).forEach((category) => {
            furnitures[category].forEach((element) => {
              setSofaDetails(prevSofaDetails => ({ ...prevSofaDetails, [element.id]: [] }));
            })
          });
        })
        .catch((error) => {
          console.error('Error fetching data (furnitures):', error);
        });

      await axios.get('http://192.168.1.2:5000/variants') // Replace with your backend's IP/URL
        .then((response) => {
          const datas = response.data;
          datas.forEach((element: { name: any; image: any; color: any; price: any; dimensions: any; roomType: any; furnitureType: any; type: any; }) => {
            setSofaDetails(prevSofaDetails => {
              const updatedSofaDetails = { ...prevSofaDetails };
              if (!updatedSofaDetails[element.type]) {
                updatedSofaDetails[element.type] = [];
              }
              updatedSofaDetails[element.type].push({ name: element.name, image: { uri: `https://github.com/TUHINMODAK/ARapp/blob/main/ARapp-main/assets/images/${element.image}?raw=true` }, color: element.color, price: element.price, dimensions: element.dimensions, roomType: element.roomType, furnitureType: element.furnitureType });
              return updatedSofaDetails;
            });
          });
        })
        .catch((error) => {
          console.error('Error fetching data (varients):', error);
        });
    }

    getdata();
  }, [])
  return (
    <Mocks1.Provider value={{ items, furnitures, sofaDetails}}>
      {children}
    </Mocks1.Provider>
  );
}