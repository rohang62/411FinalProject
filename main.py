import database_manager as dm
from dotenv import load_dotenv
import os
import csv
import datetime

# Connect to db
load_dotenv()
username = os.getenv('username')
passwd = os.getenv('passwd')
con, cursor = dm.connect_to_db("localhost", username, passwd, "cs411")
# Create User table
# dm.delete_table("User", con, cursor)
# dm.create_table("User(Username VARCHAR(255) NOT NULL, Password VARCHAR(255) NOT NULL, First_Name VARCHAR(255) NOT NULL, Last_Name VARCHAR(255) NOT NULL, Email VARCHAR(255) NOT NULL, Address VARCHAR(255), PRIMARY KEY (Username))",
#                 con, cursor)
# with open('User.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     for row in reader:
#         values = tuple(row)
#         dm.insert_into_table("User", values, con, cursor)
#
# with open('user-m.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     for row in reader:
#         values = list(row)
#         values = values[1 : ]
#         values = tuple(values)
#         dm.insert_into_table("User", values, con, cursor)
# dm.select_data("SELECT * FROM User LIMIT 5", con, cursor)
# dm.select_data("SELECT COUNT(*) FROM User", con, cursor)

# Create Customer table
# dm.delete_table("Appointment", con, cursor)
# dm.delete_table("Customer", con, cursor)
# dm.create_table("Customer(CustomerID INT NOT NULL, Username VARCHAR(255) NOT NULL, Birthday DATE, SEX VARCHAR(1), Medical_History VARCHAR(2000), PRIMARY KEY (CustomerID), FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE)",
#                 con, cursor)
# with open('Customer.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     for row in reader:
#         row[2] = datetime.datetime.strptime(row[2], "%m-%d-%Y").strftime("%Y-%m-%d")
#         values = tuple(row)
#         dm.insert_into_table("Customer", values, con, cursor)
# dm.select_data("SELECT * FROM Customer LIMIT 5", con, cursor)
# dm.select_data("SELECT COUNT(*) FROM Customer", con, cursor)

# Create MedicalProvider table
# dm.delete_table("MedicalProvider", con, cursor)
# dm.create_table("MedicalProvider(ProviderID INT NOT NULL, Username VARCHAR(255) NOT NULL, BusinessName VARCHAR(255) NOT NULL, PhoneNumber VARCHAR(255) NOT NULL, PRIMARY KEY (ProviderID), FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE)",
#                 con, cursor)
# with open('medical_providers.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     for row in reader:
#         values = list(row)
#         values = values[1 : ]
#         values = tuple(values)
#         dm.insert_into_table("MedicalProvider", values, con, cursor)
# dm.select_data("SELECT * FROM MedicalProvider LIMIT 5", con, cursor)
# dm.select_data("SELECT COUNT(*) FROM MedicalProvider", con, cursor)

# Create Services table
# dm.delete_table("Services", con, cursor)
# dm.create_table("Services(ServiceID INT NOT NULL, ProviderID INT NOT NULL, ServiceType VARCHAR(255) NOT NULL, OpeningTime TIME NOT NULL, ClosingTime TIME NOT NULL, TurnaroundTime TIME NOT NULL, Price INT NOT NULL, PRIMARY KEY (ServiceID), FOREIGN KEY (ProviderID) REFERENCES MedicalProvider(ProviderID) ON DELETE CASCADE)",
#                 con, cursor)
# with open('services.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     for row in reader:
#         values = list(row)
#         values = values[1 : ]
#         values = tuple(values)
#         dm.insert_into_table("Services", values, con, cursor)
# dm.select_data("SELECT * FROM Services LIMIT 5", con, cursor)
# dm.select_data("SELECT COUNT(*) FROM Services", con, cursor)

# cursor.execute("SELECT ServiceID FROM Services LIMIT 200")
# resultList = cursor.fetchall()
# l = []
# for row in resultList:
#     l.append(row[0])
# print(l)

# Create Appointment table
# sIds = [354605, 230026, 328397, 852661, 238096, 273500, 863223, 963109, 316527, 345259, 386890, 615676, 714220, 237834, 332302, 399037, 433514, 595669, 108753, 306711, 368884, 469089, 532210, 694472, 305444, 694537, 698819, 827240, 827798, 962352, 152864, 410788, 742060, 836571, 840536, 302407, 467179, 630327, 692682, 890541, 245468, 318698, 543100, 842384, 969151, 974011, 163876, 426084, 557117, 884744, 917669, 362903, 559870, 658636, 659470, 338254, 368043, 438546, 537162, 800825, 124073, 770906, 779109, 258933, 554968, 643441, 654158, 386000, 488411, 618260, 169803, 172545, 368307, 627338, 761398, 311494, 738544, 863264, 997012, 220399, 481994, 843000, 112295, 441300, 764562, 931447, 114139, 310403, 567457, 897625, 113602, 307359, 572023, 640692, 740449, 250815, 284171, 714629, 944219, 351929, 613765, 642226, 778037, 904293, 321522, 517577, 709953, 747348, 902641, 971448, 227869, 550126, 262624, 295226, 360950, 655596, 754084, 819778, 408202, 542726, 634654, 641675, 934792, 451479, 484434, 550172, 577755, 873042, 260335, 315317, 449800, 521499, 979417, 727393, 794816, 795716, 173452, 239909, 530131, 564426, 440478, 605898, 637247, 667141, 667272, 795949, 194192, 522713, 971794, 695169, 697472, 861140, 927834, 194855, 228520, 284145, 780041, 186976, 453345, 851659, 132266, 296159, 361461, 819681, 951401, 176821, 180091, 312159, 539815, 633165, 832052, 213771, 250149, 251057, 506118, 770893, 168181, 298686, 560518, 657451, 822095, 127250, 843976, 100762, 363310, 854445, 985229, 113751, 314086, 675480, 832633, 316455, 345176, 349628, 414456, 304538, 406027, 571574, 635622, 159302]
#
# dm.delete_table("Appointment", con, cursor)
# dm.create_table("Appointment(AppointmentID INT NOT NULL, CustomerID INT NOT NULL, ServiceID INT NOT NULL, Date DATE NOT NULL, Time TIME NOT NULL, Duration INT NOT NULL, Primary KEY (AppointmentID), FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID) ON DELETE CASCADE, FOREIGN KEY (ServiceID) REFERENCES Services(ServiceID) ON DELETE CASCADE)",
#                 con, cursor)
# with open('Appointments.csv', newline='') as csvfile:
#     reader = csv.reader(csvfile)
#     headers = next(reader, None)
#     i = 0
#     count = 0
#     for row in reader:
#         row[3] = datetime.datetime.strptime(row[3], "%d-%m-%Y").strftime("%Y-%m-%d")
#         time = row[4].split(":")
#         time[2] = "00"
#         if int(time[1]) < 15:
#             time[1] = "00"
#         elif int(time[1]) < 30:
#             time[1] = "15"
#         elif int(time[1]) < 45:
#             time[1] = "30"
#         else:
#             time[1] = "45"
#         time = time[0] + ":" + time[1] + ":" + time[2]
#         row[4] = time
#         row[2] = sIds[i]
#         count += 1
#         if count == 5:
#             i += 1
#             count = 0
#         values = tuple(row)
#         dm.insert_into_table("Appointment", values, con, cursor)
# dm.select_data("SELECT * FROM Appointment LIMIT 5", con, cursor)
# dm.select_data("SELECT COUNT(*) FROM Appointment", con, cursor)
