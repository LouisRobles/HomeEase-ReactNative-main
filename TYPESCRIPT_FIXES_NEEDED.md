# Sprint 2 TypeScript Fixes - Detailed Replacements

## File: userController.ts

**Issues: 1 (errorResponse pattern), 2 (JwtPayload import), 5 (SavedPaymentMethod)**

### Issue 2: JwtPayload Import (Line 5)

```
OLD: import { JwtPayload } from '@types/index';
NEW: import type { JwtPayload } from '../types/index';
```

(Using type-only import and relative path to avoid conflicts)

### Issue 1: errorResponse Pattern (50+ instances in userController)

**Pattern needed for ALL:**

```
OLD: return errorResponse(res, STATUS_CODE, 'message');
NEW: return res.status(STATUS_CODE).json(errorResponse(STATUS_CODE, 'message'));
```

**Specific replacements (Sample - Pattern applies to all):**

1. Line 16: Not authenticated check

```
OLD:     if (!req.user) {
      return errorResponse(res, 401, 'Not authenticated');
    }
NEW:     if (!req.user) {
      return res.status(401).json(errorResponse(401, 'Not authenticated'));
    }
```

2. Line 33: User not found

```
OLD:     if (!user) {
      return errorResponse(res, 404, 'User not found');
    }
NEW:     if (!user) {
      return res.status(404).json(errorResponse(404, 'User not found'));
    }
```

3. Line 46: Error catch block

```
OLD:   } catch (error) {
    console.error('Error fetching user profile:', error);
    return errorResponse(res, 500, 'Failed to fetch profile');
  }
NEW:   } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json(errorResponse(500, 'Failed to fetch profile'));
  }
```

(Continue this pattern for all 50+ errorResponse calls in the file)

### Issue 5: SavedPaymentMethod - getPaymentMethods (Line ~340)

```
OLD:     const methods = await prisma.savedPaymentMethod.findMany({
      where: { userId: req.user.userId },
NEW:     const methods = await prisma.savedPaymentMethod.findMany({
      where: { clientProfile: { userId: req.user.userId } },
```

### Issue 5: SavedPaymentMethod - addPaymentMethod (Line ~360)

```
OLD:       data: {
        userId: req.user.userId,
        cardType,
NEW:       data: {
        clientProfileId: req.user.clientProfileId,
        type: cardType,
```

_Note: Requires mapping cardType to SavedPaymentMethod.type_

### Issue 5: SavedPaymentMethod - deletePaymentMethod (Line ~410)

```
OLD:     if (method.userId !== req.user.userId) {
      return errorResponse(res, 403, 'You do not have permission to delete this payment method');
    }
NEW:     if (method.clientProfile.userId !== req.user.userId) {
      return res.status(403).json(errorResponse(403, 'You do not have permission to delete this payment method'));
    }
```

---

## File: paymentController.ts

**Issues: 1 (errorResponse pattern), 2 (JwtPayload import), 3 (Payment model fields), 4 (NotificationType enum)**

### Issue 2: JwtPayload Import (Line 4)

```
OLD: import { JwtPayload } from '@types/index';
NEW: import type { JwtPayload } from '../types/index';
```

### Issue 1: errorResponse Pattern (40+ instances)

Apply pattern to ALL: `return errorResponse(res, CODE, 'msg')` → `return res.status(CODE).json(errorResponse(CODE, 'msg'))`
(See userController.ts for pattern examples)

### Issue 3: Payment Model - createPayment (Lines 53-77)

The Payment model ONLY has bookingId relation, not clientId/workerId fields.

```
OLD:     const payment = await prisma.payment.create({
      data: {
        bookingId,
        clientId: booking.clientId,
        workerId: booking.workerId,
        subtotal,
        commissionAmount: commission,
        withholdingTaxAmount: withholdingTax,
        workerPayout,
        status: 'PENDING',
        escrowStatus: 'HELD',
        paymentMethod: 'PAYMONGO',
      },
    });

NEW:     const payment = await prisma.payment.create({
      data: {
        bookingId,
        subtotal,
        commissionAmount: commission,
        withholdingTaxAmount: withholdingTax,
        workerPayout,
        totalAmount: subtotal,
        status: 'PENDING',
        escrowStatus: 'HELD',
        methodType: 'CARD',
      },
    });
```

### Issue 3: Payment Model - getPaymentDetail (Line 117-118)

Payment does NOT have clientId/workerId - access through booking relation:

```
OLD:     if (payment.clientId !== req.user.userId && payment.workerId !== req.user.userId) {
      return errorResponse(res, 403, 'You do not have permission to view this payment');
    }

NEW:     if (payment.booking.clientId !== req.user.userId && payment.booking.workerId !== req.user.userId) {
      return res.status(403).json(errorResponse(403, 'You do not have permission to view this payment'));
    }
```

### Issue 4: NotificationType - PAYMENT_RELEASED (Line 279)

Invalid enum type - use PAYMENT_RECEIVED instead:

```
OLD:     await prisma.notification.create({
      data: {
        userId: payment.workerId,
        type: 'PAYMENT_RELEASED',
        title: 'Payment Released',
        message: `₱${payment.workerPayout} has been released to your account`,
        relatedId: payment.bookingId,
      },
    });

NEW:     await prisma.notification.create({
      data: {
        userId: payment.booking.workerId,
        type: 'PAYMENT_RECEIVED',
        title: 'Payment Released',
        message: `₱${payment.workerPayout} has been released to your account`,
        relatedId: payment.bookingId,
      },
    });
```

### Issue 3: Payment Model - releaseEscrow (Line 261-263)

```
OLD:     if (payment.clientId !== req.user.userId) {
      return errorResponse(res, 403, 'You do not have permission to release this payment');
    }
    ...
    // Notify worker
    await prisma.notification.create({
      data: {
        userId: payment.workerId,

NEW:     if (payment.booking.clientId !== req.user.userId) {
      return res.status(403).json(errorResponse(403, 'You do not have permission to release this payment'));
    }
    ...
    // Notify worker
    await prisma.notification.create({
      data: {
        userId: payment.booking.workerId,
```

### Issue 3: Payment Model - refundPayment (Line 330 & 343)

```
OLD:     if (payment.clientId !== req.user.userId) {
      return errorResponse(res, 403, 'You do not have permission to refund this payment');
    }
    ...
    // Notify worker
    await prisma.notification.create({
      data: {
        userId: payment.workerId,
        type: 'PAYMENT_REFUNDED',

NEW:     if (payment.booking.clientId !== req.user.userId) {
      return res.status(403).json(errorResponse(403, 'You do not have permission to refund this payment'));
    }
    ...
    // Notify worker
    await prisma.notification.create({
      data: {
        userId: payment.booking.workerId,
        type: 'PAYMENT_RECEIVED',
```

---

## File: bookingController.ts

**Issues: 1 (errorResponse pattern), 2 (JwtPayload import), 4 (NotificationType enum)**

### Issue 2: JwtPayload Import (Line 4)

```
OLD: import { JwtPayload } from '@types/index';
NEW: import type { JwtPayload } from '../types/index';
```

### Issue 1: errorResponse Pattern (40+ instances)

Apply pattern to ALL: `return errorResponse(res, CODE, 'msg')` → `return res.status(CODE).json(errorResponse(CODE, 'msg'))`

### Issue 4: NotificationType - Invalid enum types (Multiple locations)

**createBooking - Line 100 (BOOKING_CREATED → BOOKING_REQUEST)**

```
OLD:     await prisma.notification.create({
      data: {
        userId: workerId,
        type: 'BOOKING_CREATED',
        title: 'New Booking Request',
        message: `${booking.client.fullName} has requested your service`,
        relatedId: booking.id,
      },
    });

NEW:     await prisma.notification.create({
      data: {
        userId: workerId,
        type: 'BOOKING_REQUEST',
        title: 'New Booking Request',
        message: `${booking.client.fullName} has requested your service`,
        relatedId: booking.id,
      },
    });
```

**acceptBooking - Line 317 (BOOKING_ACCEPTED - valid)**
Already correct, just needs errorResponse pattern fix.

**declineBooking - Line 390 (BOOKING_DECLINED → BOOKING_REJECTED)**

```
OLD:     await prisma.notification.create({
      data: {
        userId: updated.clientId,
        type: 'BOOKING_DECLINED',
        title: 'Booking Declined',
        message: 'The worker has declined your booking request',
        relatedId: id,
      },
    });

NEW:     await prisma.notification.create({
      data: {
        userId: updated.clientId,
        type: 'BOOKING_REJECTED',
        title: 'Booking Declined',
        message: 'The worker has declined your booking request',
        relatedId: id,
      },
    });
```

**startBooking - Line 453 (BOOKING_STARTED → BOOKING_ACCEPTED)**

```
OLD:     await prisma.notification.create({
      data: {
        userId: updated.clientId,
        type: 'BOOKING_STARTED',
        title: 'Service Started',
        message: 'The worker has started your service',
        relatedId: id,
      },
    });

NEW:     await prisma.notification.create({
      data: {
        userId: updated.clientId,
        type: 'BOOKING_ACCEPTED',
        title: 'Service Started',
        message: 'The worker has started your service',
        relatedId: id,
      },
    });
```

**completeBooking - Line ~730 (Check for invalid types)**
Verify BOOKING_COMPLETED is valid (it is).

---

## File: workerController.ts

**Issues: 1 (errorResponse pattern), 2 (JwtPayload import)**

### Issue 2: JwtPayload Import (Line 4)

```
OLD: import { JwtPayload } from '@types/index';
NEW: import type { JwtPayload } from '../types/index';
```

### Issue 1: errorResponse Pattern (15 instances)

Apply pattern to ALL: `return errorResponse(res, CODE, 'msg')` → `return res.status(CODE).json(errorResponse(CODE, 'msg'))`

---

## File: messageController.ts

**Issues: 1 (errorResponse pattern), 2 (JwtPayload import)**

### Issue 2: JwtPayload Import (Line 4)

```
OLD: import { JwtPayload } from '@types/index';
NEW: import type { JwtPayload } from '../types/index';
```

### Issue 1: errorResponse Pattern (8 instances)

Apply pattern to ALL: `return errorResponse(res, CODE, 'msg')` → `return res.status(CODE).json(errorResponse(CODE, 'msg'))`

**Note:** Message model DOES have isRead and readAt fields - no issues there.

---

## Summary

**Total Replacements Needed:** ~150+

- **errorResponse pattern fixes:** ~100 instances across 5 files
- **JwtPayload imports:** 5 files
- **Payment model field access:** 6-8 instances (paymentController)
- **NotificationType enum:** 5 instances (bookingController: 3, paymentController: 2)
- **SavedPaymentMethod:** 3 instances (userController)

**Validation After Fixes:**

1. All `errorResponse()` calls must be wrapped with `res.status().json()`
2. All imports must use relative paths with `../types/index` or appropriate type-safe import
3. Payment queries must access client/worker through `payment.booking` relation
4. All notifications must use valid NotificationType enum values only
5. SavedPaymentMethod queries must use clientProfile relation
