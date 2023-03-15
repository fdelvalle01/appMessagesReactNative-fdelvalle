import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

/**
 * Este código se utiliza para obtener los contactos del 
 * dispositivo en una aplicación React. Define un hook personalizado 
 * llamado useContacts() que utiliza la función useState() para 
 * inicializar el estado de los contactos como un arreglo vacío.
 * Luego, utiliza la función useEffect() para ejecutar una función asíncrona cuando 
 * se monta el componente. Esta función solicita permisos para acceder a los 
 * contactos del dispositivo mediante una llamada a 
 * Contacts.requestPermissionsAsync(). Si se otorgan los permisos, 
 * se obtienen los contactos mediante una llamada a Contacts.getContactsAsync(). 
 * Si hay contactos disponibles, se establecen en el estado del componente 
 * mediante una llamada a setContacts(). Finalmente, el hook useContacts() 
 * devuelve el estado de los contactos. Los componentes que utilicen este 
 * hook pueden acceder al estado de los contactos y mostrar información 
 * sobre los contactos del dispositivo.
 * @returns     
 */

export function useContacts() {
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.FirstName,
              Contacts.Fields.LastName,
              Contacts.Fields.PhoneNumbers,
            ],
          });
  
          if (data.length > 0) {
            setContacts(data);
          }
        }
      })();
    }, []);
    return contacts;
  }
  
  