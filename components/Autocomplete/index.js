import { useRef, useState } from "react";
import { Form } from "semantic-ui-react";

const Autocomplete = () => {
  const [error, setError] = useState(null);
  const complet = useRef();

  if (typeof window !== "undefined") {
    const center = { lat: 10.471599365443314, lng: -66.95680455688138 };
    // Create a bounding box with sides ~10km away from the center point
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };

    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: ["VE"] },
      fields: ["address_components", "geometry"],
      strictBounds: false,
      types: ["address"],
    };

    // const input = document.getElementById("completado");

    const onPlaceChanged = () => {
      const place = autocomplete.getPlace();

      if (!place?.geometry) {
        setError("Selecciona desde el autocompletado para calcular el envío");
        complet.current.placeholder = "Selecciona del autocompletado";
      } else {
        const service = new google.maps.DistanceMatrixService();
        const request = {
          origins: [center],
          destinations: [
            {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          ],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };

        service
          .getDistanceMatrix(request)
          .then((response) => {
            console.log(response);
            response.rows[0].elements.forEach((element) => {
              const distanceString = element.distance.text.split(" ", 1)[0];
              const distNumber = distanceString.replace(",", ".");

              if (distNumber < 10) {
                console.log(element, "SI SE PUEDE");
                const result = {
                  address: response.destinationAddresses,
                  distance: element.distance.text.split(" ", 1)[0],
                  duration: element.duration.text.split(" ", 1)[0],
                };
              } else {
                console.log(element, "NO SE PUEDE");
              }
            });
          })
          .catch(() => setError("Ocurrio un error, intente de nuevo"));
      }
    };

    const autocomplete = new google.maps.places.Autocomplete(complet, options);

    autocomplete.addListener("place_changed", onPlaceChanged);
  }
  console.log(complet);
  return (
    <>
      <Form.Input
        ref={complet}
        name="zona"
        type="text"
        label="Calle/Av/Zona"
        placeholder="Selecciona del autocompletado"
        error={error}
      />
    </>
  );
};

export default Autocomplete;
