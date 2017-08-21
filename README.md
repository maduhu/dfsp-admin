# DFSP-Admin

## Summary ##

This service is used as a main interface for the users with admin role. Admin panel provide to the users a way to set transaction rules, process bulk payments, check queues with action notifications and etc. 

## Access

The admin panel is accessible only with admin credentials on [http://localhost:8020](http://localhost:8020 "http://localhost:8020") path where dfsp-admin service is hosted.

***Note***
The are roles associated with the admins in order to upload, verify and process bulk payments. More about bulk payments will follow in this document. 


## Bulk Payment Initiation

In the admin portal there is an interface available where every user (with certain user rights) of the DFSP can login with user number and PIN and initiate a bulk payment.

When initiating a bulk payment the user is able to select an account from which the bulk payments will be send.

L1P is supporting upload of the bulk file with payments from a web interface. The file format should be .csv. The fields in the file will be:

- Sequence Number (row)
- Identifier
- First Name
- Last Name
- Date of birth
- National id
- Amount

## Maker/Checker

There is a maker/checker concept implemented for bulk payments. Maker and Checker are roles that can be assigned to different users. Maker role is going to upload the file with the bulk payments and checker role is going to initiate the bulk payments.

***Note*** 

In order to login in the admin interface with maker role use the following pattern `userIdentifier@role`
Example: 
1. 10121416@maker - for login with maker role
2. 10121416@checker - for login with checker role

## Bulk File Verification

All the fields in the bulk file are mandatory. In case the some of the required fields are not valid the funds will not be disbursed to this user.

## Handling Fees

The discriminatory fees should be recorded in the same way as it is done for a regular transaction - different row in the ledger for each payment. There is possibility to configure different fees per different transaction type, so there could be special set of fee configured for the bulk payments.
The rational behind having the fees recorded as a separate line for each transaction is:

- Calculation and record of the discriminatory fees are done within the DFSP and we do not foresee any performance issues to come from that approach.

- The fees must be recorded as a separate row in the ledger

## Re-sending of Funds in Case a Temporary Error is Detected

Upon sending bulk payments the system is detecting temporary errors and retry sending of funds again to those user.

Temporary errors could be technical such as missing connectivity or some service is down or non technical such as not enough funds in the account, tier limit is hit, etc.

When initiating a bulk payment the system allow entering of the start date when the bulk payments will start and the end date after which the bulk report will be finalized and no more retries to recover from temporary errors will be done.
