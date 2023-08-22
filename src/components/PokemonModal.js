import Modal from "@mui/material/Modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";

function PokemonModal({ open, handleClose, selectedPokemonSprites }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: "350px",
          height: "360px",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Carousel showIndicators={true} showThumbs={false} infiniteLoop={true}>
          {selectedPokemonSprites.map((sprite, index) => (
            <div key={index}>
              <img
                src={sprite.image}
                alt={sprite.title}
                style={{
                  maxWidth: "500px",
                  maxHeight: "500px",
                  display: "block",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
    </Modal>
  );
}

export default PokemonModal;
