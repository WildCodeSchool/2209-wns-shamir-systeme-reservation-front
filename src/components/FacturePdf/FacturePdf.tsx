import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import logo from "../../assets/images/512.png";
import signature from "../../assets/images/factureSignature.png";
import { getPeriod, readableDate } from "../../tools/utils";

function FacturePdf({ reservationProductsPDF, order, currentUserPDF }: any) {
  const date = new Date().toLocaleDateString();
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Facture N°{order?.id}</Text>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logo} />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.title}>Informations de facturation</Text>
              <Text style={styles.text}>
                Nom : {currentUserPDF?.lastname} {currentUserPDF?.firstname}
              </Text>
              <Text style={styles.text}>Email : {currentUserPDF?.email}</Text>
              <Text style={styles.text}>Tel : {currentUserPDF?.phone}</Text>
              <Text style={styles.text}> </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.title}>Informations de l'entreprise</Text>
              <Text style={styles.text}>WildBooking</Text>
              <Text style={styles.text}>
                10 Rue de la Montagne, Alpes FRANCE
              </Text>
              <Text style={styles.text}>+33299887755</Text>
              <Text style={styles.text}>N° Siret 102569875412</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Détails de la commande</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Produit</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Prix/Jour</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Quantité</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Période location</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Prix TTC</Text>
                </View>
              </View>
              {reservationProductsPDF?.map((item: any) => (
                <View style={styles.tableRow}>
                  <>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.product.name}</Text>
                      <Text style={{ marginTop: 2, fontSize: 10 }}>
                        {item.product.description}
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.product.price} €
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>{item.quantity}</Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={{ marginTop: 5, fontSize: 10 }}>
                        {readableDate(item.reservation.start)}
                      </Text>
                      <Text style={{ marginTop: 2, fontSize: 10 }}>
                        {readableDate(item.reservation.end)}
                      </Text>
                      <Text style={styles.tableCell}>
                        soit{" "}
                        {getPeriod(
                          item.reservation.start,
                          item.reservation.end
                        )}{" "}
                        jour(s)
                      </Text>
                    </View>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>
                        {item.reservation.price * item.quantity} €
                      </Text>
                    </View>
                  </>
                </View>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <Text style={styles.totalPrice}>
                Prix total : {order?.total_price} € TTC
              </Text>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.dateToday}>
                  {" "}
                  Fait le : {date} à Alpes FRANCE{" "}
                </Text>
                <Image style={styles.signature} source={signature} />
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    //margin: 10,
    flexGrow: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  infoBox: {
    width: "48%",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "column",
  },
  headerRight: {
    flexDirection: "column",
    textAlign: "right",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  table: {
    //@ts-ignore
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    width: "100%",
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 15,
    marginTop: 20,
    marginRight: 10,
  },
  signature: {
    width: 200,
  },
  dateToday: {
    fontSize: 15,
  },
  logo: {
    width: 70,
  },
  logoContainer: {
    backgroundColor: "#9dbcd387",
    padding: 5,
    borderRadius: 5,
  },
});

export default FacturePdf;
