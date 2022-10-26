import { ModalRoot, React } from "../other/apis.js";
import { i18n } from "@acord/extension";
import toasts from "@acord/ui/toasts";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";
import { fetchNames } from "../other/api.js";
import utils from "@acord/utils";

const PAGE_SIZE = 24;

export function Modal({e, id}) {
    const [data, setData] = React.useState({ page: 0, names: [], type: "ALL" });
    const [loading, setLoading] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);

    async function onChange(page=0, type="ALL") {
        setLoading(true);
        let names = await fetchNames(id, type, page*PAGE_SIZE, PAGE_SIZE);
        setData({ page, type, names });
        setHasMore(!!(await fetchNames(id, type, (page + 1)*PAGE_SIZE, 1)).length);
        setLoading(false);
    }

    React.useEffect(()=>{
        onChange(0, "ALL");
    }, []);

    return <ModalRoot
        transitionState={e.transitionState}
        size="medium"
        className="aka--modal-root"
    >
        <div className="aka--modal-header">
            <div className="title">
                {i18n.format("AKA")}
            </div>

            <div onClick={e.onClose} className="aka--modal-close" >
                <CloseIcon color={COLORS.SECONDARY} />
            </div>
        </div>
        <div className="aka--modal-content">
            <div className="top">
                <div className={`types ${loading ? "disabled" : ""}`}>
                    {
                        ["USER", "ALL", "GUILD"].map(type=>(
                            <div className={`type ${data.type == type ? "selected" : ""}`} onClick={()=>{ onChange(type == data.type ? data.page : 0, type); }}>
                                {i18n.format(type)}
                            </div>
                        ))
                    }
                </div>
                <div className="content">
                    {data.names.map(name=>(
                        <div className="item" onClick={()=>{
                            utils.copyText(name);
                            toasts.show(i18n.format("X_COPIED", name));
                        }}>
                            <div className="text" acord--tooltip-content={name}>{name}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="controls-container">
                <div className={`controls ${loading ? "disabled" : ""}`}>
                    <div className={`back ${data.page == 0 ? "disabled" : ""} arrow`} onClick={()=>{ onChange(data.page-1, data.type); }}>&lt;&lt;</div>
                    <div className="page">{data.page+1}</div>
                    <div className={`next ${!hasMore ? "disabled" : ""} arrow`} onClick={()=>{ onChange(data.page+1, data.type); }}>&gt;&gt;</div>
                </div>
            </div>
        </div>
    </ModalRoot>
}