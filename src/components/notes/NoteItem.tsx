import React, {useState} from 'react';
import style from './Notes.module.scss';
import {Hashtags} from '../hashtags/Hashtags';
import {TextItem} from '../text/TextItem';

export const NoteItem: React.FC<NoteItemPropsType> = (
    {id, text, hashtags, removeNotesCallBack, updateNoteCallBack}
) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const changeEditModeHandler = (value: boolean) => setIsEditMode(value);

    const updateNote = (text: string) => {
        updateNoteCallBack({id, text});
        changeEditModeHandler(false);
    }
    const removeNote = () => removeNotesCallBack(id);
    return (
        <article className={style.noteItem}>
            <TextItem
                className={style.text}
                text={text}
                updateNoteCallBack={updateNote}
                isEditMode={isEditMode}
            />
            <Hashtags hashtags={hashtags}/>
            <button className={style.removeButton} onClick={removeNote}>&#10006;</button>
            {
                !isEditMode
                && <button className={style.editButton} onClick={() => changeEditModeHandler(true)}>&#9998;</button>

            }
        </article>
    )
}

interface NoteItemPropsType {
    id: number
    text: string
    hashtags: string[]
    removeNotesCallBack: (id: number) => void
    updateNoteCallBack: (values: { id: number, text: string }) => void
}
