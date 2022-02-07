import ReadingGroup from "../ReadingGroup";
import React, { useState } from "react";
import PopupModal from "../Modal/PopupModal";
import FormInput from "../FormInput/FormInput";

const ReadingGroupTable = ({ readingGroups }) => {

    const [readingGroupInfoModal, setReadingGroupInfoModal] = useState(false)

    return (
        <>
            <div className="sections-list">
                {readingGroups.length && (
                    readingGroups.map((readingGroup) => (
                        <ReadingGroup showReadingGroupInfoModal={() => setReadingGroupInfoModal(readingGroup)} key={readingGroup.id} readingGroup={readingGroup} />
                    ))
                )}
                {!readingGroups.length && (
                    <p>No reading groups found!</p>
                )}
            </div>
            {readingGroupInfoModal && <PopupModal
                modalTitle={"Reading Group Info"}
                onCloseBtnPress={() => {
                    setReadingGroupInfoModal(false);
                }}
            >
                <div className="mt-4 text-left">
                    <form className="mt-5">
                        <FormInput
                            disabled
                            type={"text"}
                            name={"title"}
                            label={"Title"}
                            value={readingGroupInfoModal?.title}
                        />
                        <FormInput
                            disabled
                            type={"text"}
                            name={"start-date"}
                            label={"Start Date"}
                        // value={readingGroupInfoModal?.}
                        />
                        <FormInput
                            disabled
                            type={"text"}
                            name={"source"}
                            label={"Source"}
                            value={readingGroupInfoModal?.source}
                        />
                    </form>
                </div>
            </PopupModal>}
        </>
    )
}

export default ReadingGroupTable;