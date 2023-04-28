import Swal from 'sweetalert2'
import "../OrderDetails/order.css"
import { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client'
import { DELETE_ORDER } from '../../graphql/mutations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GET_ORDER_BY_ID } from '../../graphql/queries'
import { getPeriod } from '../../tools/utils'
import { setCart } from '../../store/features/cartSlice'
import { useDispatch } from 'react-redux'
import IProductCart from '../../interfaces/IProductCart'
import { useNavigate } from 'react-router-dom';

function OrderCancel() {
  const [deleteOrder] = useMutation(DELETE_ORDER);
  const [getOrderById] = useLazyQuery(GET_ORDER_BY_ID);
  const userIdStore = useSelector((state: RootState) => state.user.user.id);
  const cartStore = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  async function handleDeleteOrder() {
    const orderId = localStorage.getItem("orderIdToConfirm");
    localStorage.removeItem("orderIdToConfirm");
    await deleteOrder({ variables: {orderId: orderId ? parseInt(orderId) : 0}})
  }

  async function handleRestoreCart() {
    const orderId = localStorage.getItem("orderIdToConfirm");
    const result = await getOrderById({variables: {orderId: orderId ? parseInt(orderId) : 0, userId: userIdStore}})
    const reservations = result.data.getOrderById.reservations;
    let newCart: IProductCart[] = [];
    reservations.forEach((reservation: any) => {
      let selectedReservation = newCart.find((product) => product.id === reservation.product.id)
      if (selectedReservation && selectedReservation.dateFrom === reservation.start && selectedReservation.dateTo === reservation.end) {
        const newQty = selectedReservation.qtyInCart + 1;
        const period = getPeriod(reservation.start, reservation.end);
        const newPrice = selectedReservation.price * newQty * period;
        const reservationCartUpdated = {
          ...selectedReservation,
          qtyInCart: newQty,
          subtotal: newPrice,
        };
        let updatedCart = newCart.filter(
          (product) => product.id !== selectedReservation?.id
        );
        newCart = [...updatedCart, reservationCartUpdated];

      } else {
        const period = getPeriod(reservation.start, reservation.end);
        const newPrice = reservation.product.price * period;

        selectedReservation = {
          ...reservation.product,
          dateFrom: reservation.start,
          dateTo: reservation.end,
          qtyInCart: 1,
          subtotal: newPrice,
        };

        if (selectedReservation) {
          newCart.push(selectedReservation);
        }
      }
    });

    dispatch(setCart(newCart));
    
    localStorage.removeItem("orderIdToConfirm");
    await deleteOrder({ variables: {orderId: orderId ? parseInt(orderId) : 0}})
  }

  useEffect(() => {
    Swal.fire({
      title: '<h2 class="m-4">Que souhaitez-vous faire ?</h2>',
      width: 500,
      heightAuto: true,
      showDenyButton: true,
      confirmButtonText: '<h4 class="m-2">Continuer</h4><h4 class="m-2">mes achats !</h4>',
      denyButtonText: '<h4 class="m-2">Annuler</h4><h4 class="m-2">ma commande</h4>',
    }).then((result) => {
      if (result.isConfirmed) {
        handleRestoreCart()
        Swal.fire({
          icon: 'success',
          title: '<h2 class="m-4">Vous pouvez reprendre vos achats.</h2>',
          showConfirmButton: false,
          timer: 2500
        })
      } else if (result.isDenied) {
        handleDeleteOrder()
        Swal.fire({
          icon: 'info',
          title: '<h2 class="m-4">Votre commande est annulée.</h2>',
          showConfirmButton: false,
          timer: 2500
        })
        navigate('/catalogue')
      }
    })
  }, [])

  return (
    <div className="container-sm">
      <main role="main" className="mainProfil">
        <div className="row justify-content-center">
            <h1 className="text-center titleResetPassword">Le paiement de votre commande n'a pas abouti</h1>
        </div>
      </main>
  </div>
  )
}

export default OrderCancel