import React from 'react';
import style from './Notes.module.scss';
import {NoteItem} from './NoteItem';
import {NotesContext} from '../app/App';

export const Notes: React.FC<NotesPropsType> = ({notes}) => {
    return (
        <NotesContext.Consumer>
            {value =>
                <div className={style.notes}>
                    {
                        notes.map(
                            n => <NoteItem
                                key={n.id}
                                id={n.id}
                                text={n.text}
                                hashtags={n.hashtags}
                                removeNotesCallBack={value.removeNotesCallBack}
                                updateNoteCallBack={value.updateNoteCallBack}
                            />
                        )
                    }
                </div>
            }
        </NotesContext.Consumer>

    )
}

export interface NoteType {
    id: number
    text: string
    hashtags: string[]
}

interface NotesPropsType {
    notes: NoteType[]
}