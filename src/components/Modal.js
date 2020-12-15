import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import InfoBox from "./InfoBox";
import "../styles/Modal.styles.scss";

const Modal = forwardRef(({ beer }, ref) => {
  const backgroundRef = useRef();
  const [display, setDisplay] = useState(false);

  const [expandedInfoBoxName, setExpandedInfoBoxName] = useState(null);

  const { abv, ibu, target_og, hops, yeast, malt } = beer;

  useImperativeHandle(ref, () => ({
    open,
  }));

  const open = () => {
    setDisplay(true);
  };

  const handleClickOutsideModal = (e) => {
    if (backgroundRef.current === e.target) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    // close modal when user clicks outside
    window.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      window.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  if (display) {
    return (
      <div className="modal-wrapper">
        <div ref={backgroundRef} className="modal-background"></div>
        <div className="modal-box">
          <div className="info-box-wrapper">
            <InfoBox
              name="abv"
              value={abv}
              imageUrl={"../../assets/abv-white-2.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("abv")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
            <InfoBox
              name="ibu"
              value={ibu}
              imageUrl={"../../assets/ibu-white.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("ibu")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
            <InfoBox
              name="yeast"
              value={yeast}
              imageUrl={"../../assets/style-white.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("yeast")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
            <InfoBox
              name="og"
              value={target_og}
              imageUrl={"../../assets/og-white.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("og")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
            <InfoBox
              name="malt"
              value={malt}
              imageUrl={"../../assets/malt-white.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("malt")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
            <InfoBox
              name="hops"
              value={hops}
              imageUrl={"../../assets/hops-white.svg"}
              expandInfoBox={() => setExpandedInfoBoxName("hops")}
              expandedInfoBoxName={expandedInfoBoxName}
              closeInfoBox={() => setExpandedInfoBoxName("")}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
});

export default Modal;
