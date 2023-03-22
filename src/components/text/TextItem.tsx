import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {HashtagButton} from '../hashtags/HashtagButton';
import style from '../notes/Notes.module.scss';
import {NotesContext} from '../app/App';

export const TextItem: React.FC<TextItemPropsType> = ({className, text, updateNoteCallBack, isEditMode}) => {
    const [value, setValue] = useState(text);
    const changeValueHandler = (e: ChangeEvent<HTMLTextAreaElement>) => setValue(e.currentTarget.value);
    const keyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') updateNoteCallBack(value);
        if (e.key === 'Escape') setValue('');
    }
    const clickHandler = () => updateNoteCallBack(value);

    const textWithHashtagButtons = text.split(' ').map((w, i) => w.charAt(0) === '#' ?
        <NotesContext.Consumer>
            {value =>
                <HashtagButton
                    changeSearchTextValueCallBack={value.changeSearchTextValueCallBack}
                    hashtag={w}
                    key={i + w}/>
            }</NotesContext.Consumer>
        : `${w} `);

    return !isEditMode
        ? <div className={className}>{textWithHashtagButtons}</div>
        : <div className={className}>
            <textarea
                value={value}
                onChange={changeValueHandler}
                onKeyDown={keyPressHandler}
            />
            <button className={style.editButton} onClick={clickHandler}>&#10004;</button>
        </div>
}

interface TextItemPropsType {
    className?: string
    text: string
    updateNoteCallBack: (text: string) => void
    isEditMode: boolean
}