const modalWish = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: 400,
  bgcolor: '#a27f19',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  gap: 2,
}

const modalAdmin = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  alignItems: 'center',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export const modalStyle = {
  modalWishListPage: modalWish,
  modalAdminPage: modalAdmin,
}
