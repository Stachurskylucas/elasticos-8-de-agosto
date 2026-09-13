// ============================================================
// DATOS DE CONTACTO — cambialos acá una sola vez y se
// actualizan en TODAS las páginas del sitio.
// ============================================================
export const WHATSAPP_NUMBER = "5491146690000" // sin +, sin espacios
export const PHONE_DISPLAY = "(011) 4669-0000"
export const PHONE_TEL = "+541146690000"
export const EMAIL = "contacto@elasticos8deagosto.com.ar"
export const ADDRESS = "Pablo Podestá, Buenos Aires"
export const HOURS = "Lun a Vie 7-18hs · Sáb 7-13hs"
export const MAPS_URL =
  "https://www.google.com/maps/place/El%C3%A1sticos+8+de+Agosto/@-34.5666772,-58.6213974,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcb961b3c304dd:0x5c0eba73143fa2ae!8m2!3d-34.5666772!4d-58.6213974"
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=-34.5666772,-58.6213974&hl=es&z=17&output=embed"

/** Genera un link de WhatsApp con mensaje pre-cargado */
export function wa(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
