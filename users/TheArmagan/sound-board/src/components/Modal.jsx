import { ModalRoot, React } from "../other/apis.js";
import { i18n } from "@acord/extension";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";

const PAGE_SIZE = 28;

export function Modal({names, table, playSound, e}) {
    const [data, setData] = React.useState({ page: 0, names: [] });
    const [hasMore, setHasMore] = React.useState(true);

    async function onChange(page=0) {
        let d = names.slice(page*PAGE_SIZE, PAGE_SIZE);
        setData({ page, names: d });
        setHasMore(!!d[((page + 1)*PAGE_SIZE)+1]);
    }

    React.useEffect(()=>{
        onChange(0);
    }, []);

    return <ModalRoot
        transitionState={e.transitionState}
        size="medium"
        className="sb--modal-root"
    >
        <div className="sb--modal-header">
            <div className="title">
                {i18n.format("SOUND_BOARD")}
            </div>

            <div onClick={e.onClose} className="sb--modal-close" >
                <CloseIcon color={COLORS.SECONDARY} />
            </div>
        </div>
        <div className="sb--modal-content">
            <div className="top">
                <div className="content">
                    {data.names.map(name=>(
                        <div className="item" onClick={()=>{
                            playSound(table[name].src, table[name].volume);
                        }}>
                            <div className="text" acord--tooltip-content={`${name} (${i18n.format("VOLUME", ~~(table[name].volume * 100))})`}>{name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="controls-container">
                <div className={`controls`}>
                    <div className={`back ${data.page == 0 ? "disabled" : ""} arrow`} onClick={()=>{ onChange(data.page-1, data.type); }}>&lt;&lt;</div>
                    <div className="page">{data.page+1}</div>
                    <div className={`next ${!hasMore ? "disabled" : ""} arrow`} onClick={()=>{ onChange(data.page+1, data.type); }}>&gt;&gt;</div>
                </div>
            </div>
        </div>
    </ModalRoot>
}