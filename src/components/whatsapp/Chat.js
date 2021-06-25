import React, {useEffect, useRef, useState} from 'react'
import {useForm} from "react-hook-form";
import '../FontAwesome';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Picker from 'emoji-picker-react';
import TextareaAutosize from "react-autosize-textarea"
import {emoji} from "../../services/EmojiService"


function Chat(props) {
    const [isError, setIsError] = useState(false);
    const {register, handleSubmit, errors} = useForm();
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [mensajeUnicode, setMensajeUnicode] = useState("");
    const [emojiHidden, setEmojiHidden] = useState(true);
    
    const wrapperRef = useRef(null);
    const wrapperEmojiRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    useOutsideAlerter(wrapperEmojiRef);

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setMensaje(mensaje + emojiObject.emoji);
        setMensajeUnicode(mensajeUnicode +emoji[emojiObject.unified.toUpperCase()]);        
    }
    
    function encode_utf8(s) {
        return unescape(encodeURIComponent(s));
      }
      
      function decode_utf8(s) {
        return decodeURIComponent(escape(s));
      }

    function onSubmit(data, e) {
        props.handleClick(data)
        setMensaje("")//borra el contenido de los inputs
        setMensajeUnicode("")//borra el contenido de los inputs
    }

    function onInputChange(e){
        setMensaje(e.target.value)
        setMensajeUnicode(e.target.value)
    }

    function handleEmoji(e){
        if(emojiHidden==true){
            setEmojiHidden(false);
        }else{
            setEmojiHidden(true);
        }
    }

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && (!ref.current.contains(event.target) )) {
                    setEmojiHidden(true);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        });
    }

    return (
        <div className="chat_footer">
            <form onSubmit={handleSubmit(onSubmit)} className="text-center p-3 needs-validation">
                <div className="emoji_icons" ref={wrapperRef}>
                    <FontAwesomeIcon onClick={handleEmoji}  icon={['far', 'smile']} className="mr-2"/>
                    <div className={emojiHidden ? "hidden_picker_emoji" : ""} id="emoji_display">
                        <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} 
                        groupNames={{
                            smileys_people: 'personas',
                            animals_nature: 'naturaleza',
                            food_drink: 'comidas',
                            travel_places: 'lugares',
                            activities: 'actividades',
                            objects: 'objetos',
                            symbols: 'simbolos',
                            flags: '',
                            recently_used: 'reciente'}}/>
                    </div>
                </div>
                <input name="mensaje_unicode" type="text" hidden={true} readOnly value={mensajeUnicode} ref={register({})}/>
                <TextareaAutosize
                    style={{ maxHeight: 100, boxSizing: 'border-box' }}
                    name="mensaje"
                    type="text"
                    className="form-control"
                    placeholder="Ingrese su Mensaje"
                    value={mensaje}
                    onChange={onInputChange}
                    ref={
                        register({
                            required: {value: true, message: 'Debe Ingresar un Mensaje'}
                        })
                    }
                />
                {/*
                <span className="text-danger small">
                    {errors.mensaje && errors.mensaje.message}
                </span>
                */}
                <button type="submit" className="btn btn-success"><FontAwesomeIcon icon="paper-plane"></FontAwesomeIcon>Enviar</button>
            </form>
        </div>
    )
}


const EmojiData = ({chosenEmoji}) => (
    <div>
      <strong>Unified:</strong> {chosenEmoji.unified}<br/>
      <strong>Names:</strong> {chosenEmoji.names.join(', ')}<br/>
      <strong>Symbol:</strong> {chosenEmoji.emoji}<br/>
      <strong>ActiveSkinTone:</strong> {chosenEmoji.activeSkinTone}
    </div>
  );

export default Chat;

